import { Request, Response } from "express";
import fs from "fs"
import path from "path"
import { Favorite } from "../models/favorite";

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


export const changeList = async (req: Request, res: Response, next: any) => {
	try {
		console.log(req.body.list);
		
		if (req.user) {
			const listExist = await Favorite.findOne({user: req.user})
			
			if(!listExist){
				const list = new Favorite({
					user: req.user,
					list: req.body.list
				})
				await list.save()
				res.status(200).send(list);
			}
			else {
				await listExist.updateOne({
					user: req.user,
					list: req.body.list
				})
				res.status(200).send(listExist);
			}
		}
		else res.status(200).send({ message: 'User Not Regitsterd' });
	} catch (error) {
		next(error);
	}
};

export const getList = async (req: Request, res: Response, next: any) => {
	try {
		if (req.user) {
			const list = await Favorite.findOne({user: req.user})
			res.status(200).send(list);
		}
		res.status(200).send({ message: 'User Not Regitsterd' });
	} catch (error) {
		next(error);
	}
};