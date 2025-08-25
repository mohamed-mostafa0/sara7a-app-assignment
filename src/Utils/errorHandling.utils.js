const globalErrorHandling = async (err,req,res,next)=>{
    const status = err.cause || 500

if(req.session && req.session.inTransaction){
   await req.session.abortTransaction()
   req.session.endSession()
    console.log('transaction aborted');
    
}
    console.log("ERROR:",err);
    
    return res.status(status).json({msg:"something went wrong" , message:err.message , stack:err.stack})

}

export default globalErrorHandling;