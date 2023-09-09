import express from "express";
import passport from "passport";
import { changeCardList, getCardList } from "../controllers/cardController";
const router = express.Router()

router.get("/", passport.authenticate('jwt', { session: false }), getCardList)
router.put("/", passport.authenticate('jwt', { session: false }), changeCardList)

export const cardRoutes = router