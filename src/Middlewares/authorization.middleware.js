

 const athorizationMiddleware = ({accessRoles = []}) =>{
   return async (req,res,next)=>{
            if(!accessRoles.includes(req.loggedInUser.user.role)){
                next(new Error('You are not authorized to access this resource', {cause:403}))
            }
            return next()
    }
}

export default athorizationMiddleware