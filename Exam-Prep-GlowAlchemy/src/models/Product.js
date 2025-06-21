import { Schema , model , Types } from "mongoose";

const productShema = new Schema({
    name : {
        type:String,
        required:true,
    },
    skin : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true,
    },
    ingredients : {
        type:String,
        required:true,
    },
    benefits : {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    image: {
        type:String,
        require:true
    },
    owner : {
        type : Types.ObjectId,
        ref : 'User'
    }

})

const Product = model('Products' , productShema)

export default Product