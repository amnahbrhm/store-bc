import express from "express";
import passport from "passport";
import { changeList, getList } from "../controllers/favoriteController";
const router = express.Router()

router.get("/", passport.authenticate('jwt', { session: false }), getList)
router.put("/", passport.authenticate('jwt', { session: false }), changeList)

export const favoriteRoutes = router