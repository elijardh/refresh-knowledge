import { Request,Response, NextFunction } from "express";

const requireUser =( req:Request,res:Response, next:NextFunction) =>{
const user = res.locals.user;

if (!user) {
    return res.sendStatus(404);
}
return next();
}

export default requireUser;