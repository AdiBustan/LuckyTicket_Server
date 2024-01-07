
import { Express } from 'express';
import request from 'supertest';
import initApp from '../app';
import mongoose from "mongoose";
//import StudentPost from "../models/student_post_model";

let app:Express;

beforeAll(async () => {
    app = await initApp();
    //await Student.deleteMany();
})

afterAll( async () => {
    await mongoose.connection.close();   
})

interface ISudentPost {
    title: string;
    message: string;
    owner: string;
}

const post1: ISudentPost = {
    title: "title1",
    message: "message1",
    owner: "12345"
};

describe("Student post test", () => {
    const addStudentPost = async (post: ISudentPost) => {
        const response = await request(app).post("/studentpost").send(post);
        expect(response.statusCode).toBe(201);
        expect(response.body).toBe("OK");
    };
   
    test("Test get all student post - empty", async () => {
        const response = await request(app).get("/studentpost");
        expect(response.statusCode).toBe(200);
        expect(response.text).toStrictEqual([]);
    });
    
    test("test post student post", async () => {
        addStudentPost(post1);
    });

    test("Check DB with one student post", async () => {
        const response = await request(app).get("/studentpost");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe(post1.title);
        expect(response.body[0].message).toBe(post1.message);
        expect(response.body[0].owner).toBe(post1.owner);
    });
});