import express from "express";
import path from "path";
import authRouter from './routers/authRouter.js';
import employeeRouter from './routers/employeesRouter.js';
import {SERVER_PORT} from './config/index.js';


const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/data", employeeRouter);



app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
    req.logger;
});

app.listen(SERVER_PORT, () => {
    console.log(`Server has been started on port ${SERVER_PORT}...`);
});