import express, { json } from "express";
import 'express-async-errors';
import cors from "cors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000/'
}));
app.use(json({
    limit: "50kb"
}));
// app.use(handleError);

app.listen(3001, '0.0.0.0', () => console.log('listening on http://localhost:3001/'));