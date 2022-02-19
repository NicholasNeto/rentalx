import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";


interface IPayload {
    sub: string
}

export async function ensureAuthenticated(request : Request, response: Response, next: NextFunction) {
   const authHeader =  request.headers.authorization;

   if(!authHeader){
    throw new Error("Token missing")
   }

   const [, token] = authHeader.split(" ")

   try {
        const { sub: user_id }  = verify(token, "cb7aad368fbbba2f70dffdae85fe1a2e") as IPayload
        console.log("---> ", user_id)

        const userRepository = new UserRepository()
        const user = userRepository.findById(user_id)

        if(!user){
            throw new Error("USer does not exists!")
        }
        
        next()
   } catch (error) {
       throw new Error("Invalid token")
   }
}