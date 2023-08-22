export interface IUser {
    id: string;
    user_name: string;
    email: string;
    password: string;
    role: "admin" | "user" | undefined;
}