import env from "dotenv";
env.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import eventRoute from "./routes/event_route";
import eventPostRoute from "./routes/event_post_route";
import authRoute from "./routes/auth_route";
import userRoute from "./routes/user_route";
import fileRoute from "./controllers/file_controller";
import user_controller from "./controllers/user_controller";

const initApp = (): Promise<Express> => {
    const promise = new Promise<Express>((resolve) => {
        const db = mongoose.connection;
        db.once("open", () => console.log("Connected to Database"));
        db.on("error", (error) => console.error(error));
        const url = process.env.DB_URL;
        mongoose.connect(url!).then(() => {
            const app = express();
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use((req, res, next) => {
                // Dealing with CORS problam
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "*");
                res.header("Access-Control-Allow-Methods", "*");
                next();
            })
            app.use("/event", eventRoute);
            app.use("/eventPost", eventPostRoute);
            app.use("/auth", authRoute);
            app.use("/user", userRoute);
            app.use("/file", fileRoute);
            resolve(app);
        });
    });
    return promise;
};

export default initApp;