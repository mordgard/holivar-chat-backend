import bodyParser from "body-parser";
import express from "express";
import { connectToDb } from "./database/db";
import { routes } from "./routes";

const app: express.Application = express();

connectToDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/topics", routes.topics);
app.use("/api/v1/users", routes.user);
app.use("/api/v1", routes.auth);

export { app };
