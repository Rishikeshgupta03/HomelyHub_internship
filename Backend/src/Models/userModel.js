// user schema

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import crypto from "node:crypto";

const userSchema=new mongoose.Schema(
{
	name:{
		type:String,
		required:[true,"please enter the name"],
		trim:true,
		maxlength:[50,"your name can not longer then the 50 char"]
	},
	email:{
		type:String,
		required:[true,"please ente rvalid"],
		unique:true,
		lowercase:true,
		trim:true,
		validate:[validator.isEmail,"enter valid email"]
	},
	password:
	{
		type:String,
		required:[true,"enetr the password"],
		minlength:[6,"minimum password length is 6 "],
		select:false
	},
	passwordConfirm:
	{
		type:String,
		required:[true,"confirm the password"],
		validate:{
			validator:function(el){
				return el===this.password
			},
			message:"pass are not the same!"
		}
	},
	phoneNumber:{
		type:String,
		required:true,
		trim:true,
		unique:true
	},
	role:{
		type:String,
		enum:["user","admin"],
		default:"user"
	},
	avatar:{
		url:{type:String},
		public_id:{type:String}
	},
	passwordChangedAt:{
		type:Date,
		
	},
	passwordResetToken:{
	  type:String,
      select:false,
      index:true	  
	},
	passwordResetExpires:{
		type:String,
		slelect:false
	},	
},
{tiemstamps:true}
)
//setting to not pass response from server
userSchema.set("toJSON",{
	transform:function (doc,ret){
		delete ret.password;
		delete ret.passwordChangedAt;
		delete ret.passwordResetToken;
		delete ret.passwordResetExpires;
		delete ret.__v;
		return ret;
	}
	
})

//password logic

userSchema.pre("save",async function(){
	if(!this.isModified("password")) return;
	
	this.password=await bcrypt.hash(this.password,12);
	this.passwordConfirm=undefined;
	
})

//login Check

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
	return await bcrypt.compare(candidatePassword,userPassword)
}


userSchema.methods.changedPasswordAfter =function (JWTTimestamp){
	if(this.passwordChangedAt){
		const changedTimeStamp =parseInt(
		this.passwordChangedAt.getTime()/1000,10
		);
		return JWTTimestamp<changedTimeStamp
	}
	return false;
}


// forget password
userSchema.methods.createPasswordResetToken=function(){
	const resetToken= crypto.randomBytes(32).toString("hex");
	this.passwordResetToken =crypto.createHash("sha256").update(resetToken).digest("hex");
	
	this.passwordResetExpires =Date.now() +10*60*1000;
	return resetToken;
}

const User=mongoose.model("User",userSchema);
export {User};