import express, {Application, Request, Response } from "express";
import * as ItemService from "../services/items.services";
import { BaseItem,Item } from "../models/item.interface";
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

        // Returns all items
        app.get("/", async (req: Request, res:Response) => {

        try {
            const items: Item[] = await ItemService.findAll();

            res.status(200).send(items);
            
        } catch (error) {
            res.status(500).send(error);
        }
            
        });

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

        app.post("/api/products",[requireUser,validate(createProductSchema)], createProductHandler);

        app.put("/api/products/:productID",[requireUser,validate(updateProductSchema)], updateProductHandler);

        app.get("/api/products/:productID",validate(getProductSchema), getProductHandler);

        app.delete("/api/products/:productID",[requireUser,validate(deleteProductSchema)], deleteProductHandler);


        app.get("/:id",async (req: Request, res:Response) =>{

            const id:number = parseInt(req.params.id,10);

            try {

                const item:Item|null = await ItemService.find(id);

                if (item == null) {
                    res.status(200).send({"error":"Not found"});
                      return;
                }
                res.status(200).send(item);

                
            } catch (error) {
                res.status(500).send(error);
           
                
            }
           
        });

        app.post("/create", async (req:Request, res:Response)=>{
            try {

            
               const item: BaseItem =req.body;

               const newItem = await ItemService.create(item);

               res.status(201).json(newItem);

            } catch (error) {
                res.status(500).send(error);
                
            }
        });
        app.put("/update/:id", async (req:Request,res:Response)=>{
       const id: number =parseInt(req.params.id, 10);

       try {
        const itemUpdate:Item = req.body;

        const existingItem:Item|null = await ItemService.find(id);

        if (existingItem == null) {
            res.status(200).send({"error":"Not found"});
            return;
        }

        if (existingItem) {
            const updatedItem = await ItemService.update(itemUpdate,id);

            res.status(200).json(updatedItem);
            return;
        }

        const newItem =await ItemService.create(itemUpdate);

        res.status(200).json(newItem);
       } catch (error) {
        res.status(500).send(error);
       }
        });

        app.post("/delete/:id",async (req:Request, res:Response) =>{
            try {
                const id: number =parseInt(req.params.id);
                await ItemService.remove(id);

                res.sendStatus(200);
            } catch (error) {

                 res.status(500).send(error);
            }
        });
    };


}

export const route = new Routes().router;
