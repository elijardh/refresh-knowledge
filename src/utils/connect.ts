import mongoose from "mongoose";
import  * as dotenv from "dotenv";

export async function connect() {

    
    try {
        const dbUri:string = process.env.DBURI as string;

        console.log(dbUri + "hehehehe");
        await mongoose.connect(dbUri);

        console.log("success");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
  
}
