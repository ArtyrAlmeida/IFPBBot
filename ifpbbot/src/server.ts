import dotenv from "dotenv";
dotenv.config();

import { app } from "./app/app";

app.listen(3030, () => console.log("Server started"));