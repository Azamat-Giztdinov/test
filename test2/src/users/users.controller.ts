import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("problem-update")
    async problemUpdate(): Promise<{updateCount: number}> {
        const updateCount = await this.usersService.updateProblem();
        return {updateCount};
    }

}
