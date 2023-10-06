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

import swaggerUi from "swagger-ui-express";
import  swaggerJsDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "https://blogapi-se2j.onrender.com"
            }
        ]
    },
    apis: ["./routes/*.js", "./modules/*.js"],
}

const specs = swaggerJsDoc(options);

const port = process.env.PORT || 5000;
const app = express();
connectDB();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(upload.single("image"));

app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoute);

app.use("*", (req, res) => {
    return res.status(404).json({
      status: "failed",
      message: "Invalid URL",
    });
  });

app.listen(port, console.log(`server started on port ${port}`));


