import { Request, Response } from 'express';

export const  createUser = async (req: Request, res: Response)=> {
    //@ts-ignore
const userId = req.user?.id 
//@ts-ignore
const userMail = req.user?.email;
res.send("Successfully Signed In : " + userMail)
}