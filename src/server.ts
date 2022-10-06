import express, { json, NextFunction, Request, Response } from 'express';
import database from './database';
import userRouter from './routes';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(json());
app.use(database);
app.use('/user', userRouter);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.trace(error);
    res.status(500).json(error);
});
app.listen(PORT, console.log.bind(this, 'server listening on port:', PORT));
