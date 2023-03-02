import express, {Application, Request, Response } from "express";

import  * as dotenv from "dotenv";

import { route } from "./routes";
import { connect } from "./utils/connect";
import { deserialUser } from "./middlewares/deserializeuser";



dotenv.config();

const app: Application = express();

const port:Number = parseInt(process.env.PORT as string,10);


var bodyParser = require('body-parser')//add this 

app.use(bodyParser());

app.use(deserialUser);

route(app)



app.listen(port, async () =>{

    console.log(port);
    
 console.log('Server started at port}');

 await connect();
});



