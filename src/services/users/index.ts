// src/services/authService.ts
import { AppDataSource } from '../../config/db';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async register(firstName: string, lastName: string, email: string, password: string) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) throw new Error('User already exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUUID = uuidv4();
        const user = this.userRepository.create({ firstName, lastName, email, password: hashedPassword, uuid: newUUID });
        await this.userRepository.save(user);
        return this.generateTokens(user);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Invalid credentials');
        return this.generateTokens(user);
    }

    private generateTokens(user: User) {
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
        return { accessToken, refreshToken };
    }
}


export default UserService;