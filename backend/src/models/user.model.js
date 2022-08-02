const mongoose=require("mongoose");
const userSchema=mongoose.Schema({

    userName:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true,unique:true},
    phone:{type:String, required:true,unique:true},
    role:[String]
},
{
    timestamps:"true"
})

userSchema.pre("save", function(next){
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User=mongoose.model("user",userSchema)
module.exports=User;