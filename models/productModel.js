import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true

    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    incrediants:{
          type:String,
          required:true,
          trim:true
    },
    image:{
        type:String
    },
    category:{ 
     type:String,
     enum:['juice','cake'],
     required:true
    },
    stock:{
       type:Number,
       default:0,
       min:0
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    isVeg:{
        type:Boolean,
        default:true,
        required:true
    }

})

const Product = mongoose.model('Product',productSchema)

export default Product