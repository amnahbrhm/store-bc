import express from "express";
import { index, add, deleteItem, editItem, getIamge } from "../controllers/itemsController"
import passport from "passport";
// import t from "../middlewares/multer";
const router = express.Router()

import multer from "multer"

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads')
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});

const upload = multer({ storage: storage })


router.post("/",passport.authenticate('jwt', { session: false }), upload.single('img'), add)
router.delete("/", passport.authenticate('jwt', { session: false }), deleteItem)
router.get("/image/:id", getIamge)
router.get("/", index)
router.put("/", passport.authenticate('jwt', { session: false }), upload.single('img'), editItem)

export const itemsRoutes = router




