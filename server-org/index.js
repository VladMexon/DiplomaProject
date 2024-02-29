import express from "express";
import path from "path";
import {SERVER_PORT} from './config/index.js';
import {requestTime, logger} from './midlewares.js';
import {getEmployee, newEmployee} from './utils/dbFunctions.js';

const __dirname = path.resolve();
const app = express();

app.use(requestTime);
app.use(logger);
app.use(express.json());

app.get('/api/getemployee', (req, res) => {
    let id = req.query.id;
    getEmployee(id).then((employee) => {
        res.send(JSON.stringify(employee));
    });
    req.logger;
});

app.post('/api/newemployee', (req, res) => {
    console.log(req.body)
    let employee = req.body;
    newEmployee(employee).then((data) => {
        res.send(data);
    })
    req.logger;
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
    req.logger;
});

app.listen(SERVER_PORT, () => {
    console.log(`Server has been started on port ${SERVER_PORT}...`);
});