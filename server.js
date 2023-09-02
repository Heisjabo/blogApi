import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRouter.js";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", userRoute);

app.listen(port, () => console.log(`server started on port ${port}`));


