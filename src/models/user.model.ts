import mongoose from "mongoose";
import bcrypt, { hashSync } from "bcrypt";

//user interface
export interface UserDocument extends mongoose.Document{
    email: string,
    name:string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword:string) :Promise<boolean>
}

//mongoose schema
const userSchema = new mongoose.Schema({
    email: {type:String, required: true,unique:true},
    name:{type:String, required: true,},
    password:{type:String,require:true}
},{timestamps:true});


//function called before saving it
userSchema.pre("save",async function (this: UserDocument, next) {
    const user  = this;

    if (!user.isModified("password")) {
        return next();
    } else {
        
        const salt = await bcrypt.genSalt(10);

   

        const hash = await hashSync(user.password,salt);

        user.password = hash;

        return next();


    }

});

// compare password
userSchema.methods.comparePassword = async function ( this:UserDocument, candidatePassword:string) : Promise<boolean> {
    const user = this;

    return bcrypt.compare(candidatePassword,user.password).catch((e)=> false);
}

const UserModel = mongoose.model<UserDocument>("User",userSchema);
 
export default UserModel;