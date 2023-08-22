// import passportJWTl from "../middlewares/passportJWT";
import { Router } from "express";
import { changeRole, profile, deleteUser, usersList } from "../controllers/usersController";
const router = Router();
import passport from 'passport';


router.get("/profile", passport.authenticate('jwt', {session: false}), profile);
router.post("/changeRole", passport.authenticate('jwt', {session: false}), changeRole);
router.get("/", passport.authenticate('jwt', {session: false}), usersList);
router.delete("/", passport.authenticate('jwt', {session: false}), deleteUser);

export const usersRoutes = router
