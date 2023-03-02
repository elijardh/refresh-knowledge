import { Response } from "express";

class Responses{

    public ok = (status: number, message:String, res: Response) =>{
        return res.status(status).json({
            status,message
        });
    };

    public error = (status: number, message:String, res: Response) =>{
        return res.status(status).json({
            status,message
        });
    };
}
export default Responses;