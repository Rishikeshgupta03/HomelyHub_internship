import 'dotenv/config';
import express from 'express';
import cors from "cors";
import connectDB from './utils/db.js';
import cookieParser from "cookie-parser";
import {router} from "./routes/userRoutes.js";
import {propertyRouter} from "./routes/propertyRouter.js";
import {bookingRouter} from "./routes/bookingRouter.js";
import { tripRouter} from "./routes/tripRouter.js";


const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",                 
        "https://homelyhubbooking.netlify.app"   
    ],
    credentials: true,                           
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie-parser
app.use(cookieParser())

//test route
app.get("/", (req, res) => {
    console.log("welcome to te page");
    res.send("welcome to the home page");
});
app.use("/api/v1/rent/user/booking",bookingRouter);
app.use("/api/v1/rent/user",router);
app.use("/api/v1/rent/listing",propertyRouter);
app.use("/api/v1/rent/trip",tripRouter);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server is running on port:", PORT)
});
