import { NextFunction, Request, Response } from "express";
import { UserRepository } from "@modeles/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";


export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const userRepository = new UserRepository()
    const user  = await userRepository.findById(id)
    
    if(!user.isAdmin){
        throw new AppError("User isn't admin", 401)    
    }
    return next()
}