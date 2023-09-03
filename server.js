import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRouter.js";
const port = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoute);

app.listen(port, () => console.log(`server started on port ${port}`));


