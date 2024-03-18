import { AuthResquest } from "../common/auth_middleware";
import BaseController from "./base_controller";
import { Response } from "express";
import User, { IUser } from '../models/user_model';
import user_model from "../models/user_model";


class userController extends BaseController<IUser>{
    constructor() {
        super(user_model)
    }

    async getByUserId(req: AuthResquest, res: Response) {
        console.log("user email:" + req.body);
        const userId = req.user._id;
        console.log("connected user: " + userId)
        const user = await User.findOne({ '_id': userId });
        res.status(200).send(user);
    }

    async post(req: AuthResquest, res: Response) {
        console.log("user:" + req.body);
        const _id = req.user._id;
        console.log("connected user: " + _id)
        const user = await User.findOne({ '_id': _id });
        req.body.phone = user.phone;
        super.post(req, res);
    }
}

export default new userController();