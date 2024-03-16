import { AuthResquest } from "../common/auth_middleware";
import EventModel, { IEvent } from "../models/event_model";
import BaseController from "./base_controller";
import { Response } from "express";
import User from '../models/user_model';


class eventController extends BaseController<IEvent>{
    constructor() {
        super(EventModel)
    }

    async post(req: AuthResquest, res: Response) {
        console.log("postEvent:" + req.body);
        const _id = req.user._id;
        console.log("connected user: " + _id)
        const user = await User.findOne({ '_id': _id });
        req.body.phone = user.phone ? user.phone : user.email;
        super.post(req, res);
    }
}

export default new eventController();