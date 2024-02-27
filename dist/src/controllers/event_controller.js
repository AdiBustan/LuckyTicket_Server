"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_model_1 = __importDefault(require("../models/event_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
const eventController = new base_controller_1.default(event_model_1.default);
exports.default = eventController;
//# sourceMappingURL=event_controller.js.map