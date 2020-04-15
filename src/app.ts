import express from "express";
import { connectToDb } from "./database/db";
import { routes } from "./routes";

const app: express.Application = express();

connectToDb();

app.use(express.json());

app.use("/api/v1/topics/", routes.topicsRoutes);
app.use("/api/v1/users/", routes.userRoutes);
app.use("/api/v1/", routes.authRoutes);

export { app };
