import express, { Application } from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import routes from './routes';
import './config/dbConnection';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use('/api/v1', routes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}.`);
});