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

    async updateById (req: AuthResquest, res: Response) {
        console.log("updateEventById: " + req.body._id)
        try {
            const model = await user_model.findByIdAndUpdate(req.body._id, 
                {   username: req.body.username,
                    phone: req.body.phone,
                    imgName: req.body.imgName,});
            res.status(200).send(model);
            console.log("seccess")
        } catch(err) {
            console.log(err)
            res.status(500).json({message: err.message});
        }
    }
}

export default new userController();