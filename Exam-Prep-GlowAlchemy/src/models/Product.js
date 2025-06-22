import { Schema , model , Types } from "mongoose";

const productShema = new Schema({
    name : {
        type:String,
        required:true,
        minLength:[2]
    },
    skin : {
        type:String,
        required:true,
        minLength:[10],
        maxLength:[100]
    },
    description : {
        type:String,
        required:true,
        minLength:[20],
        maxLength:[200]
    },
    ingredients : {
        type:String,
        required:true,
        minLength:[2],
        maxLength:[50]
    },
    benefits : {
        type:String,
        required:true,
        minLength:[10],
        maxLength:[100]
    },
    price: {
        type:Number,
        required:true,
        min:[0]
    },
    image: {
        type:String,
        require:true,
        validate:/^https?:\/\//
    },
    owner : {
        type : Types.ObjectId,
        ref : 'User'
    },
    recommends : [{
        type : Types.ObjectId,
        ref: 'User'
    }]

})

const Product = model('Products' , productShema)

export default Product