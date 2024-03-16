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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const event_model_1 = __importDefault(require("../models/event_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
let app;
let accessToken;
const user = {
    email: "testEvent@test.com",
    password: "1234567890",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield event_model_1.default.deleteMany();
    user_model_1.default.deleteMany({ 'email': user.email });
    yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    const response = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    accessToken = response.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
const event = {
    date: "04.08.2024",
    hour: "20:00:00",
    location: "Zapa Herzeliya",
    city: "Herzeliya",
    artist: "Natan Goshen",
    phone: "",
    comments: [],
    _id: "1234567890",
};
describe("Event tests", () => {
    const addEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/event")
            .set("Authorization", "JWT " + accessToken)
            .send(event);
        expect(response.statusCode).toBe(201); //Created
    });
    test("Test Get All Events - empty response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/event").set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200); //OK
        expect(response.body).toStrictEqual([]);
    }));
    test("Test Post Event", () => __awaiter(void 0, void 0, void 0, function* () {
        addEvent(event);
    }));
    test("Test Get All Events with one event in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/event")
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const ev = response.body[0];
        expect(ev.date).toBe(event.date);
        expect(ev.hour).toBe(event.hour);
        expect(ev.location).toBe(event.location);
        expect(ev.city).toBe(event.city);
        expect(ev.artist).toBe(event.artist);
        expect(ev._id).toBe(event._id);
    }));
    test("Test Post duplicate Event", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/event").set("Authorization", "JWT " + accessToken).send(event);
        expect(response.statusCode).toBe(406);
    }));
    test("Test PUT /event/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedEvent = Object.assign(Object.assign({}, event), { date: "09.10.2024" });
        const response = yield (0, supertest_1.default)(app)
            .put(`/event/:${event._id}`)
            .set("Authorization", "JWT " + accessToken)
            .send(updatedEvent);
        expect(response.statusCode).toBe(200);
        expect(response.body.date).toBe(updatedEvent.date);
    }));
    test("Test DELETE /event/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).
            delete(`/event/${event._id}`)
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=event.test.js.map