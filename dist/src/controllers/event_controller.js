"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_model_1 = __importDefault(require("../models/event_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
const user_model_1 = __importDefault(require("../models/user_model"));
class eventController extends base_controller_1.default {
    constructor() {
        super(event_model_1.default);
    }
    post(req, res) {
        const _super = Object.create(null, {
            post: { get: () => super.post }
        });
        return __awaiter(this, void 0, void 0, function* () {
            console.log("postEvent:" + req.body);
            const _id = req.user._id;
            console.log("connected user: " + _id);
            const user = yield user_model_1.default.findOne({ '_id': _id });
            req.body.phone = user.phone ? user.phone : user.email;
            _super.post.call(this, req, res);
        });
    }
}
exports.default = new eventController();
//# sourceMappingURL=event_controller.js.map