// const asyncHandler = (fn)=>{
//     return (req,res,next)=>{
//         fn(req,res,next).catch((error)=>{
//          console.log('ERROR:',error);
//          return next(new Error(error ,{cause: 500}))
//         // return res.status(500).json({msg:"Internal Server Error", error:error.message , stack:error.stack})
//         })
//     }
// }
// export default asyncHandler
