// src/config/database.ts
import { DataSource } from 'typeorm';
import { User } from '../models/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_HOST,
    logging: true,
    entities: [User],
});
