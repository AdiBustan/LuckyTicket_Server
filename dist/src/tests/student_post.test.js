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
const student_post_model_1 = __importDefault(require("../models/student_post_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
let app;
const user = {
    email: "test@student.post.test",
    password: "1234567890",
};
let accessToken = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield student_post_model_1.default.deleteMany();
    user_model_1.default.deleteMany({ 'email': user.email });
    yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    const response = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    expect(response.statusCode).toBe(200);
    console.log("================user login " + response.body.user);
    accessToken = response.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
const post = {
    title: "title1",
    message: "message1",
    owner: "1234567890",
};
describe("Student post tests", () => {
    const addPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/studentpost")
            .set("Authorization", "JWT " + accessToken)
            .send(post);
        expect(response.statusCode).toBe(201); //Created
    });
    test("Test Get All Student posts - empty response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/studentpost").set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    }));
    test("Test Post Post", () => __awaiter(void 0, void 0, void 0, function* () {
        addPost(post);
    }));
    // test("Test Post Student post", async () => {
    //   const response = await request(app)
    //     .post("/studentpost")
    //     .set("Authorization", "JWT " + accessToken)
    //     .send(post1);
    //   expect(response.statusCode).toBe(201);
    //   expect(response.body.owner).toBe(user._id);
    //   console.log("============ owner: " + response.body.owner)
    //   expect(response.body.title).toBe(post1.title);
    //   expect(response.body.message).toBe(post1.message);
    // });
    test("Test Get All posts with one post in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/studentpost")
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const rc = response.body[0];
        console.log("===============rc: =========" + rc.body);
        expect(rc.title).toBe(post.title);
        expect(rc.message).toBe(post.message);
        expect(rc.owner).toBe(user._id);
    }));
});
//# sourceMappingURL=student_post.test.js.map