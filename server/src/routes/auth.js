import express from "express";
import authenticate from "../auth/middleware";
import register from "../auth/register";
import login from "../auth/login";
import logout from "../auth/logout";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);
AuthRouter.get("/isAuthenticated", authenticate);

export default AuthRouter;
