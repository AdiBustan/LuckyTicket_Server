"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    date: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    comments: {
        type: [String],
        required: true,
    },
    _id: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Events", eventSchema);
//# sourceMappingURL=event_model.js.map