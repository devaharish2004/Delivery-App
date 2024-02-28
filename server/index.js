import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRouter.js";
import { invRouter } from "./routes/invRouter.js";


const app = express();

dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/inventory', invRouter);


const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
    console.log(`Server is connected to Port ${PORT}`);
});