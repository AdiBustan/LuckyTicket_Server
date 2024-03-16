import { AuthResquest } from "../common/auth_middleware";
import EventModel, { IEvent } from "../models/event_model";
import BaseController from "./base_controller";
import { Response } from "express";
import User from '../models/user_model';


class eventController extends BaseController<IEvent>{
    constructor() {
        super(EventModel)
    }

    async getByUserId(req: AuthResquest, res: Response) {
        console.log("get events by user id:" + req.user._id);
        const userId = req.user._id;
        const events = await EventModel.find({'ownerId': userId});
        res.status(200).send(events);
    }

    async post(req: AuthResquest, res: Response) {
        console.log("postEvent:" + req.body);
        const _id = req.user._id;
        console.log("connected user: " + _id)
        const user = await User.findOne({ '_id': _id });
        req.body.phone = user.phone? user.phone : user.email;
        req.body.ownerId = _id;
        super.post(req, res);
    }
}

export default new eventController();