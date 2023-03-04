import { Request,Response } from "express";
import { createProductInput, updateProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findandUpdate, findProduct } from "../services/product.services";
import { update } from '../services/items.services';

 
export async function createProductHandler(req:Request<{},{}, createProductInput["body"]>, res:Response) {

    try {
        const userId = res.locals.user._id;

        const body = req.body;
    
        const product =  await createProduct({...body,user:userId});
    
        return res.send(product);
    
    } catch (error:any) {
        
        return res.status(409).send(error.message);
    }


    
}

export async function updateProductHandler(req:Request<updateProductInput['params'],{},updateProductInput['body']>, res:Response) {
   
   try {
    const userId = res.locals.user._id;

    const productID = req.params.productId;

    const update = req.body;

    const product = await findProduct({productID});

    if (!product) {
        return res.sendStatus(404);
    }

    if (product.user != userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await findandUpdate({productID}, update,{new:true});

   return res.send(updatedProduct);
   } catch (error:any) {
    
    res.status(409).send(error.message);
   } 
}

export async function getProductHandler(req:Request<updateProductInput['params']>, res:Response) {

    try {
        console.log("started");
        
        const productID = req.params.productId;
        console.log("pass 1");
        const product = await findProduct({productID});
        console.log("pass 2");
    
        
        if (!product) {
            return res.sendStatus(404);
        }

        console.log("pass 3");
    
       return res.send(product);
    } catch (error:any) {
        res.status(404).send(error.messsage);
    }


}

export async function deleteProductHandler(req:Request<updateProductInput['params']>, res:Response) {
      
   try {
    const userId = res.locals.user._id;

    const productID = req.params.productId;

    const product = await findProduct({productID});

    if (!product) {
        return res.sendStatus(404);
    }

    if (product.user != userId) {
        return res.sendStatus(403);
    }

      await deleteProduct({productID});

    res.send({"message": "Product Deleted"});
   } catch (error:any) {
    
    res.status(409).send(error.message);
   } 
}
