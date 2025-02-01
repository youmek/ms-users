import { AppDataSource } from '../../config/db';
import { User } from '../../models/User';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }
}

export default UserService;