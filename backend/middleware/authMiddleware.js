const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');

//Authentication Middleware
const protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    }
    try{
        //Get token
            token=req.headers.authorization.split(' ')[1]
        //Verify token
        const decoded=jwt.verify(token,process.env.JWT_SE);
        //Get User from token
        req.user=await User.findById(decoded.id).select('-password');
        next();
    }
    catch(err){
        res.status(401);
        throw new Error('Not an authorized user');
    }
    if(!token){
        res.status(403);
        throw new Error('Not authorized there is no token');
    }
})
module.exports={
    protect,
}