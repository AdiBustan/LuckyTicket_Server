
import request from 'supertest';
import mongoose from "mongoose";
import initApp from '../app';
import { Express } from 'express';

let app:Express;

beforeAll(async () => {
    app = await initApp();
})

afterAll( async () => {
    await mongoose.connection.close();   
})

describe("auth tests", () => {
    test("test register", async () => {
        const response = await request(app).get("/auth/register").send ({
            username: "test@test.com",
            password: "123456789",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({ message: "OK"});
    });

    test("test login", async () => {
        const response = await request(app).get("/auth/login").send ({
            username: "test@test.com",
            password: "123456789",
        });
        expect(response.statusCode).toBe(200);
    });
   
});