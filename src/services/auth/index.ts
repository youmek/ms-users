import { AppDataSource } from "../../config/db";
import { AuthentificationResponseDto, ErrorDto, LoginPayloadDto, RegisterPayloadDto } from "../../dtos";
import { User } from "../../models/User";
import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export default class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register({ firstName, lastName, email, password }: RegisterPayloadDto, res: Response) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser)
            throw new ErrorDto(409, 'User is already existing !')
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ firstName, lastName, email, password: hashedPassword, uuid: uuidv4() });
        await this.userRepository.save(user);
        const { refreshToken, accessToken } = this.generateTokens(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        });
        return new AuthentificationResponseDto(
            {
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                accessToken: accessToken
            },
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        )
    }

    async login({ email, password }: LoginPayloadDto, res: Response) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) throw new ErrorDto(401, 'Invalid credentials');
        const { refreshToken, accessToken } = this.generateTokens(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/refresh",
        });
        return new AuthentificationResponseDto(
            {
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                accessToken: accessToken
            },
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        )
    }

    private generateTokens(user: User) {
        const jwtSecret = process.env.JWT_SECRET || "";
        const accessToken = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
        return { accessToken, refreshToken };
    }
}