import passport from 'passport';
import util from 'util';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../types/auth';
import config from "../config";
import { User } from '../models/user';

export function init() {
    const secret = config.jwtSecret;
    console.log('hey');
    if (!secret) {
        throw new Error('JWT_SECRET is undefined');
    }
    const jwtOpts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
        //issuer: 'my.site.com',
        //audience: 'my.site.com'
    };

    const strategy = new Strategy(jwtOpts, async (payload: JwtPayload, done: any) => {
        const user = await User.findById(payload.id);
        console.log(user);
        console.log(payload);
        
        if (!user) return done(new Error("User not found"));
        return done(null, user);
    });
    passport.use(strategy);
}

