import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789",10);


//user interface
export interface ProductDocument extends mongoose.Document{
    user: UserDocument['_id'],
    title:string,
    description: String,
    price:number,
    image:string,
    createdAt: Date,
    updatedAt: Date,

}

//mongoose schema
const productSchema = new mongoose.Schema({
    productId:{type:String, required:true, unique:true, default: () => "product_" + nanoid()},
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    title:{type:String, require:true},
    description:{type:String, require:true},
    price:{type:Number, require:true},
    image:{type:String, require:true}, 
    userAgent:{type:String}
 
},{timestamps:true});
 

const ProductModel = mongoose.model<ProductDocument>("Product",productSchema);
 
export default ProductModel;