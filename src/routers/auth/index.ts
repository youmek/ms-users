
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided details.
 *     operationId: registerUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPayloadDto'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthentificationResponseDto'
 *       400:
 *         description: Invalid input
 * @swagger
 * /login:
 *   post:
 *     summary: Logs a new user
 *     description: Logs a new user and issues an access and a refresh token.
 *     operationId: loginUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPayloadDto'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthentificationResponseDto'
 *       401:
 *         description: Unauthoized action
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthoriedErrorDto'
 *       400:
 *         description: Invalid input
 */

import { Router, Request, Response } from 'express';
import { AuthService } from '../../services';
import { LoginPayloadDto, RegisterPayloadDto } from '../../dtos/User.dto';
import { validateDto } from '../../middlewares';
import { ErrorDto } from '../../dtos/Error.dto';

const authRouter = Router();
const authService = new AuthService();

authRouter.post('/register', validateDto(RegisterPayloadDto), async (req: Request, res: Response) => {
    try {
        const response = await authService.register(req.body, res);
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof ErrorDto) {
            console.error('Error message:', error.message);
            res.status(error.status).json({ message: error.message });
        } else {
            console.error('Unknown error', error);
            res.status(400).json({ error });
        }
    }
});

authRouter.post('/login', validateDto(LoginPayloadDto), async (req: Request, res: Response) => {
    try {
        const response = await authService.login(req.body, res);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof ErrorDto) {
            console.error('Error message:', error.message);
            res.status(error.status).json({ message: error.message });
        } else {
            console.error('Unknown error', error);
            res.status(400).json({ error });
        }
    }
});

export default authRouter;
