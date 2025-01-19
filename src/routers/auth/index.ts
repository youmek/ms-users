// src/routers/authRouter.ts
import { Router } from 'express';
import { UserService } from '../../services';

const authRouter = Router();
const userService = new UserService();

authRouter.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const tokens = await userService.register(firstName, lastName, email, password);
        res.status(201).json(tokens);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            res.status(400).json({ message: error.message });
        } else {
            console.error('Unknown error', error);
            res.status(400).json({ error });
        }
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const tokens = await userService.login(email, password);
        res.cookie("refreshToken", tokens.refreshToken);
        const { accessToken } = tokens;
        res.status(200).json(accessToken);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            res.status(400).json({ message: error.message });
        } else {
            console.error('Unknown error', error);
            res.status(400).json({ error });
        }
    }
});

export default authRouter;
