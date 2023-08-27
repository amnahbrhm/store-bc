import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { itemsRoutes } from "./routes/items";
import { usersRoutes } from "./routes/users";
import errorHandler from "./middlewares/errorHandler"
import * as passport from './services/passport';

import cors from "cors"
import { authRoutes } from "./routes/auth";
import { favoriteRoutes } from "./routes/favorite";
const app: Application = express();
const port = 3000;

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

passport.init();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/store").then(() => console.log("Db Connected!"));

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/wishlist", favoriteRoutes);

app.use(errorHandler);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}