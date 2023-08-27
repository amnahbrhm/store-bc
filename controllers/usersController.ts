import { NextFunction, Request, Response } from "express";
// models
import { User } from "../models/user";

declare global {
    interface Error {
        statusCode: number;
    }
    namespace Express {
        interface User {
            role: string
        }
    }
}

export const profile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user);
        res.status(200).send({ user });
    } catch (err) {
        next(err);
    }
};

export const changeRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user) {
            const { role } = req.user;
            if (role !== 'admin') {
                const error = new Error("Sorry, you dont have privilege");
                error.statusCode = 401;
                throw error;
            }
            else {
                const { id, role } = req.body;
                const user = await User.findOneAndUpdate({ _id: id }, { role: role });
                if (user) {
                    res.status(200).send({ message: 'Role changed' });
                }
                else {
                    const error = new Error("User not found");
                    error.statusCode = 404;
                    throw error;
                }
            }
        }
    } catch (err) {
        next(err);
    }
};

export const usersList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user) {
            const { role } = req.user;
            if (role !== 'admin') {
                const error = new Error("Sorry, you dont have privilege");
                error.statusCode = 401;
                throw error;
            }
            else {
                const pagination: number = +req.query.pagination!;
                const page: number = +req.query.page!;                
                const users = await User.find({})
                .skip((page-1) * pagination )
                .limit(pagination)
                // .sort({ createdAt: -1 });
                    console.log('first');
                    
                    console.log(pagination, page);
                    
                    console.log( await User.find({})
                    .skip(page * pagination )
                    .limit(pagination));
                    
                const hasNextPage: boolean = (await User.find({})
                    .skip(page * pagination )
                    .limit(pagination))
                    .length === 0 ? false : true
                res.status(200).send({ users, hasNextPage });
            }
        }
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user) { 
            const { role } = req.user;
            if (role !== 'admin') {
                const error = new Error("Sorry, you dont have privilege");
                error.statusCode = 401;
                throw error;
            }
            else {
                const { id } = req.query;
                // If Cast to ObjectId failed for id it would throw error 500 from db
                const user = await User.findById(id);                
                if (user) {
                    await  User.findByIdAndDelete(id);      
                    res.status(200).send({ message: 'User has been deleted' });
                }
                else {                    
                    const error = new Error("User not found");
                    error.statusCode = 404;
                    throw error;
                }
            }
        }
    } catch (err) {
        next(err);
    }
};