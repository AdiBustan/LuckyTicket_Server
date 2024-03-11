
import request from 'supertest';
import initApp from '../app';
import mongoose from "mongoose";
import Event from "../models/event_model";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;
let accessToken: string;
const user = {
    email: "testEvent@test.com",
    password: "1234567890",
}


beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
    await Event.deleteMany();

    User.deleteMany({ 'email': user.email });
    await request(app).post("/auth/register").send(user);
    const response = await request(app).post("/auth/login").send(user);
    accessToken = response.body.accessToken;
})

afterAll( async () => {
    await mongoose.connection.close();   
})

interface IEvent {
  date: string;
  hour: string;
  location: string;
  city: string;
  artist: string;
  image: string;
  phone: string;
  comments: Array<string>;
  _id: string;
}

const event: IEvent = {
    date: "04.08.2024",
    hour: "20:00:00",
    location: "Zapa Herzeliya",
    city: "Herzeliya",
    artist: "Natan Goshen",
    image: "something.jpg",
    phone: "",
    comments: [],
    _id: "1234567890",
};
  
describe("Event tests", () => {
    const addEvent = async (event: IEvent) => {
      const response = await request(app).post("/event")
        .set("Authorization", "JWT " + accessToken)
        .send(event);
      expect(response.statusCode).toBe(201); //Created
    };
    test("Test Get All Events - empty response", async () => {
      const response = await request(app).get("/event").set("Authorization", "JWT " + accessToken);
      expect(response.statusCode).toBe(200); //OK
      expect(response.body).toStrictEqual([]);
    });
  
    test("Test Post Event", async () => {
      addEvent(event);
    });
  
    test("Test Get All Events with one event in DB", async () => {
      const response = await request(app)
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
      expect(ev.image).toBe(event.image);
      expect(ev._id).toBe(event._id);
    });
  
    test("Test Post duplicate Event", async () => {
      const response = await request(app).post("/event").set("Authorization", "JWT " + accessToken).send(event);
      expect(response.statusCode).toBe(406);
    });

    test("Test PUT /event/:id", async () => {
      const updatedEvent = { ...event, date: "09.10.2024" };
      const response = await request(app)
        .put(`/event/:${event._id}`)
        .set("Authorization", "JWT " + accessToken)
        .send(updatedEvent); 
      expect(response.statusCode).toBe(200);
      expect(response.body.date).toBe(updatedEvent.date);
    });

    test("Test DELETE /event/:id", async () => {
    const response = await request(app).
    delete(`/event/${event._id}`)
    .set("Authorization", "JWT " + accessToken)
    expect(response.statusCode).toBe(200);
    });
});