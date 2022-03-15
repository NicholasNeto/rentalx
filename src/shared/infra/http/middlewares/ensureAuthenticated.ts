import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "@modeles/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";



interface IPayload {
    sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, "cb7aad368fbbba2f70dffdae85fe1a2e") as IPayload

        const userRepository = new UserRepository()
        const user = userRepository.findById(user_id)

        if (!user) {
            throw new AppError("USer does not exists!", 401)
        }

        request.user = {
           id: user_id
        }

        next()

    } catch (error) {
        throw new AppError("Invalid token", 401)
    }
}