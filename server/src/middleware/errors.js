export function notFound(req,res){res.status(404).json({error:{code:'NOT_FOUND',message:'Route not found'}})}
export function errorHandler(err,req,res,next){const status=err.status||500;req.log?.error({err,requestId:req.id},'request failed');res.status(status).json({error:{code:err.code||'INTERNAL_ERROR',message:status===500?'An unexpected error occurred':err.message,requestId:req.id}})}
