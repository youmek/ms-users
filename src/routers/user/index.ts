import { Router } from "express";
import { AppDataSource } from "../../config/db";  // Adjust the import path as necessary
import { User } from "../../models/User";  // Adjust the import path as necessary

const userRouter = Router();

// GET all users
userRouter.get('/', async (req, res) => {
    try {
        const users = await AppDataSource.getRepository(User).find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET user by ID
userRouter.get('/:id', async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try {
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT update user by ID
userRouter.put('/:id', async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { firstName, lastName, password } = req.body;

    try {
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.password = password || user.password;  // Again, hash the password before saving

        const updatedUser = await AppDataSource.getRepository(User).save(user);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE user by ID
userRouter.delete('/:id', async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    try {
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await AppDataSource.getRepository(User).remove(user);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default userRouter;
