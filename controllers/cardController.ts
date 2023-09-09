import { Request, Response } from "express";
import { Card } from "../models/card";

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


export const changeCardList = async (req: Request, res: Response, next: any) => {
	try {		
		if (req.user) {
			const listExist = await Card.findOne({user: req.user})
			console.log(req.body.list[0]);
			
			if(!listExist){
				const list = new Card({
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

export const getCardList = async (req: Request, res: Response, next: any) => {
	try {
		if (req.user) {
			const list = await Card.findOne({user: req.user})
			res.status(200).send(list);
		}
		else {
			res.status(200).send({ message: 'User Not Regitsterd' });
		}
	} catch (error) {
		next(error);
	}
};