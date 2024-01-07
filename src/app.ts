import env from "dotenv";
env.config();
import express, {Express} from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import studentRoute from "./routes/student_route";
import studentPostRoute from "./routes/student_post_route";
import authRoute from "./routes/auth_route";

const initApp = ():Promise<Express> => {
    const promise = new Promise<Express>((resolve) => {
        const db = mongoose.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("Connected to Database"));
        mongoose.connect(process.env.DB_URL!).then(() => {
            const app = express();

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));

            app.use('/student', studentRoute);
            app.use('/studentpost', studentPostRoute);
            app.use("/auth", authRoute);
            resolve(app);
        });
    });
    return promise;
};

export default initApp;

