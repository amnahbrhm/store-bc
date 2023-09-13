import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { itemsRoutes } from "./routes/items";
import { usersRoutes } from "./routes/users";
import errorHandler from "./middlewares/errorHandler"
import * as passport from './services/passport';

import cors from "cors"
import { authRoutes } from "./routes/auth";
import { favoriteRoutes } from "./routes/favorite";
import { cardRoutes } from "./routes/card";
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
mongoose.connect(`mongodb://devopshint:${encodeURIComponent('amn@1234')}@127.0.0.1:27017/store?directConnection=true&authSource=admin&appName=mongosh+2.0.0`).then(() => console.log("Db Connected!"));

// mongoose.connect("mongodb://devopshint:amn%401234@127.0.0.1:27017/store?directConnection=true&authSource=admin&appName=mongosh+2.0.0").then(() => console.log("Db Connected!"));
// mongoose.connect("mongodb://devopshint:amn%401234@localhost:27017/store?authSource=admin").then(() => console.log("Db Connected!"));
app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

app.use("/auth", authRoutes);
app.use("/items", itemsRoutes);
app.use("/users", usersRoutes);
app.use("/wishlist", favoriteRoutes);
app.use("/card", cardRoutes);

app.use(errorHandler);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
