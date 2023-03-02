import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import  * as dotenv from "dotenv";





export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
    const privatekey:string = process.env.PRIVATEKEY as string;

const publicKey:string = process.env.PUBLICKEY as string;

return  jwt.sign(object, privatekey, {...(options && options), algorithm:"RS256"});

}

export function verifyJWT(token:string) {
    try {
        //const privatekey:string = process.env.PRIVATEKEY as string;

const publicKey:string = process.env.PUBLICKEY as string;

        const decoded = jwt.verify(token, publicKey);
    
        
        return {
            valid:true,
            expired: false,
            decoded:decoded,
        }

    } catch (error:any) {
        return {
            valid:false,
            expired: error.message ==="jwt expired",
            decoded:null,
        }
    }
}