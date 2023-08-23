import { Request, Response } from "express";
import { Item } from "../models/item"
import fs from "fs"
import path from "path"

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


export const index = async (req: Request, res: Response, next: any) => {
	try {
		if (req.query.id) {
			const item = await getItemById(req.query.id)
			if (item)
				res.status(200).send(item);
			else {
				const error = new Error("Item not found");
				error.statusCode = 404;
				throw error;
			}
		}
		const pagination: number = +req.query.pagination!;
		const page: number = +req.query.page!;
		const items = await Item.find({})
			.skip((page) * pagination)
			.limit(pagination)
			.sort({ createdAt: -1 });
		const rowsCount: number = (await Item.find({})).length
		res.status(200).send({ items, rowsCount });
	} catch (error) {
		next(error);
	}
};

export const add = async (req: Request, res: Response, next: any) => {
	console.log('hey 3');

	try {
		console.log(req.user);

		if (req.user) {
			const { role } = req.user;
			if (role !== 'admin') {
				const error = new Error("Sorry, you dont have privilege");
				error.statusCode = 401;
				throw error;
			}
			let item = new Item({
				img: req.file?.filename,
				// {
				// 	data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file?.filename)),
				// 	contentType: req.file?.mimetype
				// },
				...req.body
			});
			await item.save();
			res.status(200).send(item);
		}
		else {
			const error = new Error("Sorry, you dont have privilege");
			error.statusCode = 401;
			throw error;
		}
	} catch (err) {
		next(err);
	}
};

async function getItemById(id: any): Promise<any> {
	return await Item.findById(id)
}


export const getIamge = async (req: Request, res: Response, next: any) => {
	try {
		console.log(req.params);

		res.sendFile(path.join(__dirname, `/../uploads/${req.params.id}`));
	} catch (err) {
		next(err);
	}
};

export const deleteItem = async (req: Request, res: Response, next: any) => {
	try {
		let item = await Item.findById(req.query.id);
		if (item) {
			item = await item.deleteOne();
			res.status(200).send({ messege: "Success" });
		}
		else {
			const error = new Error("Item not found");
			error.statusCode = 404;
			throw error;
		}
	} catch (err) {
		next(err);
	}
};

export const editItem = async (req: Request, res: Response, next: any) => {
	try {
		let item = await Item.findById(req.query.id);
		if (item) {
			item = await item.updateOne({ img: req.file?.filename, ...req.body });
			res.status(200).send({ messege: "Success" });
		}
		else {
			const error = new Error("Item not found");
			error.statusCode = 404;
			throw error;
		}
	} catch (err) {
		next(err);
	}
};
