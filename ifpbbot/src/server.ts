import dotenv from "dotenv";
dotenv.config();

import { app } from "./app/app";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(3030, () => console.log("Server started"));
    })
    .catch(error => console.log(error));