import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { History } from './history.model';

@Injectable()
export class HistoryService {
    constructor(@InjectModel(History) private historyModel: typeof History) {}

    createHistory(action: string, userId:number) {
        return this.historyModel.create({action, userId});
    }

    async getHistory(userId : number, page: number, limit: number) {
        if(!userId) throw new  HttpException('Не указан параметр useId', HttpStatus.BAD_REQUEST);
        const offset = (page-1) * limit;
        return this.historyModel.findAndCountAll({
            where: {userId},
            limit,
            offset
        });
    }
}
