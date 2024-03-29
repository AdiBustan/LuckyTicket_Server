
import request from 'supertest';
import mongoose from "mongoose";
import initApp from '../app';
import { Express } from 'express';
import User from "../models/user_model";

let app:Express;
const user = {
  username: "adibustan",
    email: "testUser@test.com",
    password: "1234567890",
    phone: "0587299721"
}
  
beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
    await User.deleteMany({ 'email': user.email });
})

afterAll( async () => {
    await mongoose.connection.close();   
})

let accessToken: string;
let refreshToken: string;
let newRefreshToken: string

describe("Restrict access without Auth /", () => {
  test("response error", async () => {
    const response = await request(app).post("/auth/register");
    expect(response.statusCode).not.toEqual(200)}) //OK
  
})

describe("register tests", () => {
    test("Test Register", async () => {
        const response = await request(app)
          .post("/auth/register")
          .send(user);
        expect(response.statusCode).toBe(201); //Created
    });

    test("Test Register exist email", async () => {
        const response = await request(app)
          .post("/auth/register")
          .send(user);
        expect(response.statusCode).toBe(406); //Not Acceptable
    });
    
    test("Test Register missing password", async () => {
        const response = await request(app)
          .post("/auth/register").send({
            email: "test@test.com",
          });
        expect(response.statusCode).toBe(400); //Bad Request
    });
    
})

describe("login tests", () => {
  test("Test Login", async () => {
    const response = await request(app)
      .post("/auth/login").send(user);
    expect(response.statusCode).toBe(200); //OK
    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
  });

  test("Test forbidden access without token", async () => {
    const response = await request(app).get("/event");
    expect(response.statusCode).toBe(401); //Unauthorized
  });


  test("Test access with valid token", async () => {
      const response = await request(app)
        .get("/event")
        .set("Authorization", "JWT " + accessToken);
      expect(response.statusCode).toBe(200); //OK
  });
    
  test("Test access with invalid token", async () => {
      const response = await request(app)
        .get("/event")
        .set("Authorization", "JWT 1" + accessToken);
      expect(response.statusCode).toBe(401); //Unauthorized
  });
    
  jest.setTimeout(10000);
  
  test("Test access after timeout of token", async () => {
      await new Promise(resolve => setTimeout(() => resolve("done"), 5000));
  
      const response = await request(app)
        .get("/event")
        .set("Authorization", "JWT " + accessToken);
      expect(response.statusCode).not.toBe(200); //OK
  });
})

describe("refresh token tests", () => {

  test("Test refresh token", async () => {
      const response = await request(app)
        .get("/auth/refresh")
        .set("Authorization", "JWT " + refreshToken)
        .send();
      expect(response.statusCode).toBe(200); //OK
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
  
      const newAccessToken = response.body.accessToken;
      newRefreshToken = response.body.refreshToken;
  
      const response2 = await request(app)
        .get("/event")
        .set("Authorization", "JWT " + newAccessToken);
      expect(response2.statusCode).toBe(200); //OK
  });
    
  test("Test double use of refresh token", async () => {
      const response = await request(app)
        .get("/auth/refresh")
        .set("Authorization", "JWT " + refreshToken)
        .send();
      expect(response.statusCode).not.toBe(200); //OK
  
      //verify that the new token is not valid as well
      const response1 = await request(app)
        .get("/auth/refresh")
        .set("Authorization", "JWT " + newRefreshToken)
        .send();
      expect(response1.statusCode).not.toBe(200); //OK
  });
})
