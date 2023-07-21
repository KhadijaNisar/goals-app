const  bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')

const loginUser=asyncHandler(async(req, res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email})

    if(user && await bcrypt.compare(password,user.password)){
        res.json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(404)
        throw new Error("User credentials are not valid")
    }

    res.json({message: "Login User"})
}
)

const registerUser=asyncHandler(async(req,res)=>{

    const {name,email,password} = req.body;
    //Checking if any field in not empty 
    if(!name || !email || !password){
        res.status(404)
        throw new Error("Please enter all the required fields")
    }

    //Checking if user already exists
    const exist= await User.findOne({email})
    if(exist){
        res.status(400);
        throw new Error("The user already exists");
    }

    //Hashing the password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    //Create a user
    const user= await User.create({
        name,
        email,
        password:hashedPassword,
    })
    if(user){
        res.status(200)
        res.json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(404)
        throw new Error("Invalid User Data");
    }
})

// Const JWT token
const generateToken= (id)=>{
   console.log(process.env.JWT_SE)
    return jwt.sign({ id },process.env.JWT_SE,{
        expiresIn : '30d'
    })
}
const getMe=asyncHandler(async(req,res)=>{
    const {_id,name,email}= await User.findById(req.user.id);
    res.status(200).json({
        _id,
        name,
        email,
    })

})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}