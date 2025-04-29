import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db_connect from "./utils/db_connect";

import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

// API

app.use("/api/auth", userRoutes)
app.use("/api/post", postRoutes)


db_connect(process.env.MONGODB_URI as string);
app.listen(port, () => { console.log(`Server is running on port ${port}`) });

export default app;