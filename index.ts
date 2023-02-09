import express, { json } from "express";
import 'express-async-errors';
import cors from "cors";
import { handleError } from "./utils/errors";
import rateLimit from "express-rate-limit";
import { adRouter } from "./routers/ad.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000/'
}));
app.use(json({
    limit: "50kb"
}));
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));

app.use('/ad', adRouter)
app.use(handleError);

app.listen(3001, '0.0.0.0', () => console.log('listening on http://localhost:3001/'));