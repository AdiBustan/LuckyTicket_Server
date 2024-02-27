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
//import StudentPost from "../models/student_post_model";
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    //await Student.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
const post1 = {
    title: "title1",
    message: "message1",
    owner: "12345"
};
describe("Student post test", () => {
    const addStudentPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/studentpost").send(post);
        expect(response.statusCode).toBe(201);
        expect(response.body).toBe("OK");
    });
    test("Test get all student post - empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/studentpost");
        expect(response.statusCode).toBe(200);
        expect(response.text).toStrictEqual([]);
    }));
    test("test post student post", () => __awaiter(void 0, void 0, void 0, function* () {
        addStudentPost(post1);
    }));
    test("Check DB with one student post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/studentpost");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe(post1.title);
        expect(response.body[0].message).toBe(post1.message);
        expect(response.body[0].owner).toBe(post1.owner);
    }));
});
//# sourceMappingURL=student_post.js.map