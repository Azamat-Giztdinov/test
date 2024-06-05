import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { History } from './history.model';

@Module({
  imports:[
    SequelizeModule.forFeature([History])
  ],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
