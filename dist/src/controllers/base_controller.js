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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(model) {
        this.model = model;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get all");
            try {
                const models = req.query.name ?
                    yield this.model.find({ name: req.query.name }) :
                    yield this.model.find();
                res.status(200).send(models);
            }
            catch (err) {
                res.status(500).send({ message: err.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getById: " + req.params.id);
            try {
                const model = yield this.model.findById(req.params.id);
                res.send(model);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("post: " + req.body);
            try {
                const model = yield this.model.create(req.body);
                res.status(201).send(model);
            }
            catch (err) {
                console.log(err);
                res.status(406).send("fail: " + err.message);
            }
        });
    }
    putById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("putById: " + req.params.id);
            try {
                const model = yield this.model.findByIdAndUpdate(req.body._id, { date: req.body.date }, { new: true });
                res.status(200).send(model);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: err.message });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("deleteById: " + req.params.id);
            try {
                const event = yield this.model.findByIdAndDelete(req.params.id);
                res.send(event);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map