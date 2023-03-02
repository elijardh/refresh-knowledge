import e, { NextFunction, Request,Response } from "express";
import { get } from "lodash";
import { string } from "zod";
import { reissueAccesToken } from "../services/session.service";
import { verifyJWT } from "../utils/jwt.utils";

export const deserialUser = async ( req:Request,res:Response,next: NextFunction) => {
    const accesToken = get (req, "headers.authorization","").replace("Bearer ","");

    const refreshToken  = get (req,"headers.x-refresh");

    if (!accesToken) {
        return next();

    }

    const {decoded, expired} = verifyJWT(accesToken);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    if (expired && refreshToken) {

        const newAccessToken = await reissueAccesToken(refreshToken.toString())

        console.log(newAccessToken);
        

        if (typeof newAccessToken == 'string') {
            
            console.log("token renewed");
            
            res.setHeader("x-access-token", newAccessToken);

            const result = verifyJWT(newAccessToken);
            console.log(result.expired);
            
            res.locals.user = result.decoded;

            return next();

        }
    }

    return next();
}