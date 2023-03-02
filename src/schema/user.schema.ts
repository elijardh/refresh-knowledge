import { type } from "os";
import {object, string, TypeOf} from "zod";

export const createUserSchema = object({

    body: object({
        name: string({
            required_error :"Name is required",
        }), 
        password:string({
            required_error :"Password is required",
        }).min(6,"Passowrd too short -minimum is 6"),
        passwordConfirmation:string({
            required_error :"Password is required",
        }).min(6,"Passowrd too short -minimum is 6"),
        email:string({
            required_error :"Email is required",
        }).email("Not valid email"),
    }).refine((data)=> data.password == data.passwordConfirmation, {message:"Passwords do not match",path:['passwordConfirmation']}),
 
})


export type CreateUserInput  =Omit< TypeOf<typeof createUserSchema>,"body.passwordConfirmation">;