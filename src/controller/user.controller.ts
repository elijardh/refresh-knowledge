import { Request,Response } from "express";
//lodash proviedes method for omiting data in a response
import {omit} from "lodash";
//create service is the final layer that handles the user creation
import { createUserService } from "../services/user.service";
//this is the schemaType, a way to enforce the structure of the body
import { CreateUserInput } from "../schema/user.schema";
//error handling
import { Error, FilterQuery } from "mongoose";


// this is the controller that handles the userCreation
export async function createUserHandler(req:Request<{},{},CreateUserInput['body']>, res:Response) {
    try {
        console.log("started");
        const user =await createUserService(req.body);

        return res.send(omit(user.toJSON(),"password"));
    } catch (error: any) {
        console.log(error.message);

        if (error instanceof Error.ValidationError) {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
              success: false,
              message: 'Could not create user due to some invalid fields!',
              error: messages,
            });

        } 
        return res.status(409).send({"error":error.message});
    }
} 

