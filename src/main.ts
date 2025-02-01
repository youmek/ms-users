import express from 'express';
import { userRouter, authRouter } from './routers';
import { AppDataSource } from './config/db';
import 'reflect-metadata';
import cors from 'cors';
import { allowedOrigins } from './utils';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 3000;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'User Service API',
        version: '1.0.0',
        description: 'This is the API documentation for the User Service.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routers/**/*.ts', './src/dtos/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use(express.json());

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
