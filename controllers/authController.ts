import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "../config";
// models
import { User } from "../models/user";
// types
import { IUser } from "../types/user";
declare global {
    interface Error {
        statusCode: number;
    }
}
export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { user_name, email }: IUser = req.body;
    try {
        const erros = validationResult(req);
        const userExist = await User.findOne({ user_name, email })
        if (!erros.isEmpty()) {
            const error = new Error("Please enter all required data");
            error.statusCode = 400;
            throw error;
        }

        if (userExist) {
            const error = new Error("userExist");
            error.statusCode = 400;
            throw error;
        }
        let user = new User({ ...req.body });
        await user.save();
        const token = jwt.sign({ id: user.id }, config.jwtSecret)
        res.status(200).send({ user, token });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { user_name, password }: IUser = req.body;
    try {
        const user = await User.findOne({ user_name }).select("+password")

        if (!user) {
            const error = new Error("User name not found");
            error.statusCode = 401;
            throw error;
        }
        const validPassword = await user.validPassword(password)
        if (!validPassword) {
            const error = new Error("Wrong Credentials");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ id: user.id }, config.jwtSecret)
        res.status(200).send({ user, token });

    } catch (err) {
        next(err);
    }
};