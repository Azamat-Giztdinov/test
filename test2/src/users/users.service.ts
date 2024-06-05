import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userModel: typeof User){}

    async updateProblem(): Promise<number> {
        const usersWithProblem = await this.userModel.count({where: {problem: true}});
        await this.userModel.update({problem: false}, {where: {problem: true}});
        return usersWithProblem;
    }
}
