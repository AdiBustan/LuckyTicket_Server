
import request from 'supertest';
import mongoose from "mongoose";
import Student from "../models/student_model";
import initApp from '../app';
import { Express } from 'express';

const student = {
    _id: "1234567890",
    name: "John Doe",
}

let app:Express;

beforeAll(async () => {
    app = await initApp();
    await Student.deleteMany();
})

afterAll( async () => {
    await mongoose.connection.close();   
})

describe("GET /", () => {
    test("Check empty DB", async () => {
        const response = await request(app).get("/student");
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    });
   
    test("Test post student", async () => {
        const response = await request(app).post("/student").send(student);
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe("OK");
    });

    test("Check DB with one student", async () => {
        const response = await request(app).get("/student");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]._id).toBe(student._id);
        expect(response.body[0].name).toBe(student.name);
    });
});