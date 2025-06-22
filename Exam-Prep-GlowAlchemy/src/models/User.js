import { Schema , model } from "mongoose";

const userShema = new Schema({
    name : {
        type:String ,
        required:true,
        minLength:[2],
        maxLength:[20]
    },
    email: {
        type : String,
        required : true, 
        minLength:[4]
    } , 
    password: {
        type : String,
        required : true, 
        minLength:[4]
    }
})

const User = model('User' , userShema)

export default User

