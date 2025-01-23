// Login
// Logout
// Refresh Token!

// User model:
const User = require('../models/userModel')
// JWT:
const jwt = require('jsonwebtoken')
// pwEncrypt:
const pwEncrypt = require('../helpers/pwEncryption')

module.exports = {
    //POST  /api/auth/register
    register : async (req, res) => {
        const user = await User.create(req.body);
        res.status(201).json({
          success: true,
          user,
          message: 'User created successfully',
          token:   jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '3d' })
        })
      
      },
     // POST  /api/auth/login
    login: async (req, res) => {
        // Make sure the user entered a valid email/username and password:
        const { email, password } = req.body
        if (email && password) {
          
            const user = await User.findOne({ email }).select('+password');//i get pw from db
            // Check if user exists and password is correct
            // remember we can't ask mongoose to search for an encrypted value!
            // so we have to retrieve the data then compare the values!!!
            if(user && user.password == pwEncrypt(password)){//pw from db compare with pw from req.body

                // we could also check if the user is active here!

                // the password is valid!
                // create the tokens and SEND!
                //toJson to return plain object from db wich is just user data 
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '120min' })
              

                // So when we use `user.toJSON()`, we're explicitly telling Mongoose to "flatten" the document to a simple, plain object.
                // This process essentially creates a version of the document that only includes the user data (like `username`, `email`),
                // without any of the internal metadata or non-enumerable properties.(just _doc: obj wich includ all the data wich we need)


                const refreshToken = jwt.sign({_id: user._id, password: user.password},process.env.REFRESH_KEY,
                    { expiresIn: '7d' }
                )

                res.send({
                    error: false,
                    bearer: {
                        access: accessToken,
                        refresh: refreshToken
                    }
                })

            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong username/email or password!')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Invalid login credentials!')
        }
    },
    //     ALL   /api/auth/logout

    logout: async (req, res) => {
        res.send({
            error: false,
            message: 'Logged out when you delete your tokens!!!'
        })
    },

// URL POST     /api/auth/refresh
    refresh: async (req, res) => {
        const refreshToken = req.body?.bearer?.refresh

        if (refreshToken) {
            // VERIFY TOKEN:
            jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, data) => {
                if (err) {
                    res.errorStatusCode = 401
                    throw new Error('Invalid refresh token!')
                } else {
                    // TOKEN IS VALID AND HAS NOT EXPIRED!
                    // Now we need to get the _id and password from the token to find the user
                    const { _id, password } = data

                    if (_id && password) {
                        const user = await User.findOne({ _id }).select('+password');//here we cant make query for get the user and compare his encrypted pw in same time ,we have to get the user than compar
                        // remember we can't tell mongoose to query for encrypted values!
                        if (user && user.password == password) {
                            // check if the user is active
                            if (user.isActive) {
                                // SEND A NEW ACCESS TOKEN!!!
                                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '3d' })

                                res.send({
                                    error: false,
                                    bearer: {
                                        access: accessToken
                                    }
                                })
                            } else {
                                res.errorStatusCode = 401
                                throw new Error('User is inactive!')
                            }
                        } else {
                            res.errorStatusCode = 401
                            throw new Error('User not found - BAD TOKEN!')
                        }
                    } else {
                        res.errorStatusCode = 401
                        throw new Error('Invalid token data!')
                    }
                }
            })
        } else {
            res.errorStatusCode = 401
            throw new Error('No refresh token provided!')
        }
    },
// @URL     PUT /api/auth/details  this func will be used in profil page to chang /edit the user data
// @access  private (req.user)
updateDetails :async (req, res) => { 
    const user = await User.findById(req.user._id).select('+password');
    const fieldsToUpdate = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword
    };
  
    const updatedUser = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, { //return user data accept the pw
      new: true,
      runValidators: true,
    })
  
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'User details updated successfully',
    })
  
  
  },
  
  // @URL     PUT /api/auth/password    this func will used in the profile  page btn reset password
  // @access  private (req.user) 
  updatePassword : async (req, res) => { //here the user logedin and konw th old pw and want to reset or update it 
    const user = await User.findById(req.user._id).select('+password');
     // check the password
    if(user && user.password == pwEncrypt(req.body.currentPassword)){//user will enter the old pw  as currentPassword,and the new one as newPassword
        user.password = req.body.newPassword;
        await user.save();
        res.status(200).json({
          success: true,
          message: 'User password updated successfully',
        })
    }else{
         res.errorStatusCode = 401
         throw new Error('Invalid credentials')
    }
  
  }/* This function ensures that the user's current password is verified before allowing them to update it to a new one, providing an additional layer of security. */

,deleteAccount : async (req, res) => {
    const user = await User.findById(req.user._id).select('+password');
    const data = await User.deleteOne({ _id: req.user.id })
        
                res.status( 204 ).send({
                    success: true,
                    message: 'User account deleted successfully',
                    data
                })
}

}