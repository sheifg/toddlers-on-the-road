module.exports = {
    // isAdmin
    isAdmin: (req, res, next)=>req.user?.isAdmin ? next() : next(new Error('NoPermission: You are not an Admin')),
    

    
    // isLogged
    isLogged: (req, res, next)=>req.user ? next() : next(new Error('NoPermission: You must login')),

    //isLoggedOrisAdmin
    isLoggedOrisAdmin: (req, res, next)=>{   
        if (req.user || req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login or you musst be an Admin')
        }
} 
  

}