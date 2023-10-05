import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import upload from "./helpers/multer.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRouter.js";
import blogRoute from "./routes/blogRouter.js";

const port = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(upload.single("image"));

app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoute);

app.listen(port, console.log(`server started on port ${port}`));


