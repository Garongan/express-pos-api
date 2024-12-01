import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "@routes/auth-routes";
import userRoutes from "@routes/user-routes";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;
