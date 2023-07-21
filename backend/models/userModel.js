const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name not provided"]
    },
    email:{
        type:String,
        required:[true,"Email not provided"],
        unique: true
    },
    password:{
        type: String,
        required:[true,"Password not provided"]
    }
},{
    timestamps:true
})

module.exports= mongoose.model("userModel",userSchema);
