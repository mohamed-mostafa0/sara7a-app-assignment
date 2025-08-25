import mongoose, { Schema } from "mongoose";

export const genderObj = {
    male:"male",
    female:"female"
}


export const roles = {
    user:'USER',
    admin:'ADMIN'      
} 

const userSchema = new Schema({
    firstName:{
        type:String,
        trim:true,
        required:[true,'first name field is required'],
        minlength:[3,'first name must be at least 2 characters'],
        maxlength:[20,'first name must be at most 20 characters']

    },
    lastName:{
        type:String,
        trim:true,
        required:[true,'last name field is required'],
        minlength:[3,'last name must be at least 2 characters'],
        maxlength:[20,'last name must be at most 20 characters']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:{
            values:Object.values(genderObj),
            message:"Gender must be either male or female"
        },
        default:genderObj.male
    },
    role:{
        type:String,
        enum:{
            values:Object.values(roles),
            message:"Role must be either user or admin"
        },
        default:roles.user
    },
    phone:String,
    otps:{
        confirmation:String,
        resetPassword:String
    },
    isConfirmed:{
        type:Boolean,
        default:false
    }

},
{timestamps:true}
)



const userModel = mongoose.model('users',userSchema)

export default userModel;