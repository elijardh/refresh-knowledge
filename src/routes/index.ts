import express, {Application, Request, Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import Responses from "../middlewares/responses";

//import middle ware for validation, a function that takes a schema to validate the body of request
import validate from "../middlewares/validate";
//the schema of user to validate the body of create users, this is used as parameter for the above validate function
import { createUserSchema } from "../schema/user.schema";
import { createSessionHandler, deleteSessionHandler, getUserSessionHandler } from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";
import requireUser from '../middlewares/requireuser';
import { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } from '../schema/product.schema';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller";

const responses = new Responses();

const app: Application = express();

class Routes {
    public router = (app: Application) : any => {


        //create a user endpoint
        //validate(createUserSchema) validates the body of the request
        //createUserHandler handles the user creation itself
        app.post("/api/users",validate(createUserSchema),createUserHandler);

        //create sessions
        app.post("/api/sessions",validate(createSessionSchema),createSessionHandler);

        //get sessions
        app.get("/api/session",requireUser, getUserSessionHandler);

        //delete session
        app.delete("/api/session",requireUser, deleteSessionHandler );

        //create products
        app.post("/api/products",[requireUser,validate(createProductSchema)], createProductHandler);

        //update profuct
        app.put("/api/products/:productID",[requireUser,validate(updateProductSchema)], updateProductHandler); 

        //get products
        app.get("/api/products/:productID",validate(getProductSchema), getProductHandler);

        //delete products
        app.delete("/api/products/:productID",[requireUser,validate(deleteProductSchema)], deleteProductHandler);


   
    };


}

export const route = new Routes().router;
