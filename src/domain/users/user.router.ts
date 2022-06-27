import {Router} from "express";
import {UserController} from "./user.controller";

export const userRouter = Router()
const userController = new UserController()


userRouter.get('/', userController.getUserInfo)
