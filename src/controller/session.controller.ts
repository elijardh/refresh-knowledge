import { Request,Response } from "express";
import { createSession, findSession, updateSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJWT } from "../utils/jwt.utils";
import  * as dotenv from "dotenv";

export async function createSessionHandler(req: Request, res:Response) {
 
    
    //validate user passoword
    const user = await validatePassword(req.body['email'],req.body['password']);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
 
    //create session

    const session = await createSession(user._id, req.get("user-agent")||"");
    
    // create an access token

   const accessTokenTtl = process.env.ACCESSTOKENTTL as string;
   
    const accessToken = signJWT({...user, session:session._id},{expiresIn: accessTokenTtl,});

    // create a refresh token
    const refreshTokenTtl = process.env.REFRESHTOKENTTL as string;
    
    const refreshtoken = signJWT({...user, session:session._id},{expiresIn: refreshTokenTtl});
    

    // return refresh and access token

    return res.send({refreshtoken, accessToken});
}

export async function getUserSessionHandler(req:Request,res:Response) {
    const userID:string = res.locals.user._id;

    console.log(userID);
    

    const sessions = await findSession({user:userID, valid:true}); 
    
    return res.send(sessions); 
}

export async function deleteSessionHandler(req:Request,res:Response) {
    const session  = res.locals.user.session;

    await updateSession({_id:session}, {valid: false});
     return  res.send(({
        accessToken:null,
        refreshToken:null
     }))
}