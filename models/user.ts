import mongoose, { Model } from "mongoose"
import bcrypt from "bcrypt"
import { IUser } from "../types/user";

interface IUserMethods {
    validPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+/,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    if (user.isModified("password")) {
        bcrypt.genSalt(10,
            function (err, salt) {
                if (err) return next(err);
                // hash password
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) return next(err);
                    user.password = hash;
                    next();
                })
            }
        )
    }
});

userSchema.method('validPassword', async function validPassword(condidatePassword: string): Promise<boolean> {
    const result = await bcrypt.compare(condidatePassword, this.password);
    // const result = condidatePassword == this.password ? true : false;
    return result;
});


// const User = mongoose.model("User", userSchema);
// export default User;

export const User = mongoose.model("user", userSchema)