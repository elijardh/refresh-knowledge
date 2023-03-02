import mongoose from "mongoose";
import bcrypt, { hashSync } from "bcrypt";
import { UserDocument } from "./user.model";

//user interface
export interface SessionDocument extends mongoose.Document{
    user: UserDocument['_id'],
    valid:boolean,
    userAgent: String,
    createdAt: Date,
    updatedAt: Date,

}

//mongoose schema
const sessionSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    valid:{type:Boolean, default: true,},
    userAgent:{type:String}
 
},{timestamps:true});


//function called before saving it



 

const SessionModel = mongoose.model<SessionDocument>("Session",sessionSchema);
 
export default SessionModel;