import EventModel, { IEvent } from "../models/event_model";
import BaseController from "./base_controller";

const eventController = new BaseController<IEvent>(EventModel);


export default eventController