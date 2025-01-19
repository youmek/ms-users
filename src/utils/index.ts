import { v4 as uuid } from 'uuid';

export const generateUUID = () => uuid;

export const allowedOrigins: Array<string> = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://front-poc-latest.onrender.com'
];