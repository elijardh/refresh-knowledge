import { omit } from "lodash";
import {DocumentDefinition, Error, FilterQuery} from "mongoose";

//model or model schema used to represent the user
import UserModel, { UserDocument } from "../models/user.model";

export async function createUserService(inputs:DocumentDefinition<Omit<UserDocument,"createdAt"|"updatedAt"|"comparePassword">>) {
    try {
        return await UserModel.create(inputs);
    } catch (error:any) {
        throw new Error(error);
    } 
}

export async function validatePassword(email:string, password:string) {

    const user = await UserModel.findOne({email});
    
    if (!user) {
        return false;   
    } 

  const isValid =   await user.comparePassword(password);

  if (!isValid) {
    return false;
  } else {
    return omit(user.toJSON(),"password");
  }
}

export async function findUser(id:string) {
    
    const user = UserModel.findById(id).lean;
    console.log(user?.name + "jaja");
    

    return user;
}