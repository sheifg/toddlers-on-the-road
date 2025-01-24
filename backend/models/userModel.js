const { mongoose } = require('../config/dbConnection')



// User Schema:
const UserSchema = new mongoose.Schema({
 
    name: {
        type: String,
        trim: true,
        required: [true, ' Name is required'],
      },
      last_name: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
      },
      username: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
        unique: true
    },
  
    email:{
        type: String,
         required: [true, 'username is required'],
        trim: true,
        unique: true,
        
    },
    password:{
        type: String,
      required: [true, 'Password is required'],
    
      // Make password field not selectable by default
      select: false,
    },

}, {timestamps: true, collection: 'users'})

const pwEncrypt = require('../helpers/pwEncryption')

UserSchema.pre(['save', 'updateOne'], function (next) {
    // if the password is modified, encrypt it!

    // we need to start by getting the data that is being modified or saved.
    // The way we do this is to reference the document as THIS
    const data = this?._update || this
    // if we are performing an update operation the data we're trying to store
    // is this._update.  If we're saving, it's just this.

    // email@domain.com
    const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true
    // IF we actually wanted to validate email, we would put false as the OR value!

    if (isEmailValidated) {

        // console.log('Email OK')

        if (data?.password) {

            const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)
            // This regex expression is requiring:
                // At least one lowercase letter
                // At least one uppercase letter
                // At least one digit
                // At least one special character
                // At least 8 characters

            if (isPasswordValidated) {

                // console.log('Password OK')
                data.password = pwEncrypt(data.password)

                if (this?._update) {

                    this._update = data
                    // this._update.password = data.password 

                } else {
                    // this = data // izin vermiyor.
                    this.password = data.password
                }

                //? ShortHand:
                // // save:
                // this.password = data.password = passwordEncrypt(data.password)
                // // update:
                // this._update = data
            } else {
                next(new Error('Password is not validated, At least one lowercase letter,At least one uppercase letter, At least one digit, At least one special character, At least 8 characters'))
            }
        }
        next()

    } else {
        next(new Error('Email is not validated.'))
    }
})



module.exports = mongoose.model('User', UserSchema)

// example json data for req.body:

/*
{
    "username": "admin",
    "password": "admin",
    "email": "admin@site.com",
    "isAdmin": true,
    "isActive": true
}
*/

