import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import webRoutes from "./routers/webRoutes.js";
import userRoutes from "./routers/userRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/", webRoutes);
app.use("/", userRoutes);

if (!process.env.LAMBDA_TASK_ROOT) {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;