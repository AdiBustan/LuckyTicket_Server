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
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("../models/student_model"));
const app_1 = __importDefault(require("../app"));
const student = {
    _id: "1234567890",
    name: "John Doe",
};
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    yield student_model_1.default.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("GET /", () => {
    test("Check empty DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/student");
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    }));
    test("Test post student", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/student").send(student);
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe("OK");
    }));
    test("Check DB with one student", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/student");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]._id).toBe(student._id);
        expect(response.body[0].name).toBe(student.name);
    }));
});
//# sourceMappingURL=students.test.js.map