const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"User name is required"],
    },
    email:{
        type:String,
        required:[true,"Email id is required"],
        unique:[true,"Email id already registerd"]
    },
    password:{
        type:String,
        required:[true,'password is required'],
    }
},{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);