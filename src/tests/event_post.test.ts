import { Express } from "express";
import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import EventPost, { IEventPost } from "../models/event_post_model";
import User, { IUser } from "../models/user_model";

let app: Express;
const user: IUser = {
  email: "test@event.post.test",
  password: "1234567890",
}
let accessToken = "";

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await EventPost.deleteMany();

  User.deleteMany({ 'email': user.email });
  await request(app).post("/auth/register").send(user);
  const response = await request(app).post("/auth/login").send(user);
  expect(response.statusCode).toBe(200);
  console.log("================user login " + response.body.user)
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
});

const post: IEventPost = {
  title: "title1",
  message: "message1",
  owner: "1234567890",
};

describe("Event post tests", () => {
  const addPost = async (post: IEventPost) => {
    const response = await request(app).post("/eventpost")
      .set("Authorization", "JWT " + accessToken)
      .send(post);
    expect(response.statusCode).toBe(201); //Created
  };

  test("Test Get All Event posts - empty response", async () => {
    const response = await request(app).get("/eventpost").set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Post Post", async () => {
    addPost(post);
  });

  // test("Test Post Event post", async () => {
  //   const response = await request(app)
  //     .post("/eventpost")
  //     .set("Authorization", "JWT " + accessToken)
  //     .send(post1);
  //   expect(response.statusCode).toBe(201);
  //   expect(response.body.owner).toBe(user._id);
  //   console.log("============ owner: " + response.body.owner)
  //   expect(response.body.title).toBe(post1.title);
  //   expect(response.body.message).toBe(post1.message);
  // });

  test("Test Get All posts with one post in DB", async () => {
    const response = await request(app)
    .get("/eventpost")
    .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const rc = response.body[0];
    console.log("===============rc: =========" + rc.body)
    expect(rc.title).toBe(post.title);
    expect(rc.message).toBe(post.message);
    expect(rc.owner).toBe(user._id);
  });

});