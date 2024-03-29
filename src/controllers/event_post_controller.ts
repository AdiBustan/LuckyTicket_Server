import EventPost, { IEventPost } from "../models/event_post_model";
import BaseController from "./base_controller";
import { Response } from "express";
import { AuthResquest } from "../common/auth_middleware";

class EventPostController extends BaseController<IEventPost>{
    constructor() {
        super(EventPost)
    }

    async post(req: AuthResquest, res: Response) {
        console.log("postEvent:" + req.body);
        const _id = req.user._id;
        req.body.owner = _id;
        super.post(req, res);
    }
}

export default new EventPostController();