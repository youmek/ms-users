import bodyParser from 'body-parser';
import express from 'express';
import { userRouter, authRouter } from './routers';
import { AppDataSource } from './config/db';
import 'reflect-metadata';
import cors from 'cors';
import { allowedOrigins } from './utils';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/auth', authRouter)
app.use('/users', userRouter);

const startServer = async () => {
    try {
        AppDataSource.initialize().then(() => {
            console.log('Database connected')
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }).catch((error) => console.error('Database connection error:', error));
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
