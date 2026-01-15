import mongoose, { model, Schema } from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({ 

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trime: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trime: true,
    },
    fullname: {
        type: String,
        required: true,
        trime: true,
        index: true
    },
    avatar: {
        type: String, //Cloudinary url
        required: true,
    },
    coverImage: {
        type: String, //Cloudinary url

    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video",

    }],
    password: {
        type: String,
        required: [true, 'Password is required'],
        
    },
    refreshToken: {
        type: String

    }, 


},
    {
        timestamps: true
    }
)
 
userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return JsonWebTokenError.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateAccessToken = function(){
    return JsonWebTokenError.sign(
        {
            _id: this._id,
           
        },
        process.env.REFERESH_TAOKEN_SECRET,
        {
            expiresIn: process.env.REFERESH_TAOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User",userSchema)