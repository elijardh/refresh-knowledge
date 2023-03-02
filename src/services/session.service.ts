import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import UserModel from "../models/user.model";


export async function createSession(userID: string, userAgent:string) {
    const session = await  SessionModel.create({user: userID,userAgent: userAgent});
    
    return session.toJSON();
}

export async function findSession(query:FilterQuery<SessionDocument>) {
    const sessions = await SessionModel.find(query).lean();

    return sessions;
}

export async function updateSession(query:FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {

  return  SessionModel.updateOne(query, update);
    
}

export async function reissueAccesToken(refreshToken:string) {
    const {decoded, valid} = verifyJWT(refreshToken);

    if (!decoded || !get(decoded, '_id')) {
        
        return false;
    }
    

    const session = await SessionModel.findById(get(decoded,'session'));

    console.log(session?.user+"ahha");
    
    if (!session || !session.valid) {
        return false;
    }

    const user = await findUser(session.user)
    
    //const user = await UserModel.findOne(session.user);

    console.log(user);
    
    if (!user) {
        return false;
    }

        // create an access token

   const accessTokenTtl = process.env.ACCESSTOKENTTL as string;
   
   const accessToken = signJWT({...user, session:session._id},{expiresIn: accessTokenTtl,});

   return accessToken;

   
}