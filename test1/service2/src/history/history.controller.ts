import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ConfigService } from '@nestjs/config';

@Controller('history')
export class HistoryController {
    constructor(
        private readonly historyService: HistoryService,
        private readonly configService: ConfigService
    ) {}

    @Post()
    async create(@Body() createHistoryDto: {action :string, userId: number}, @Req() request: any) {
        const apiKey = await request.headers['api-key'];
        const validApiKey = this.configService.get<string>('api_key');
        if(apiKey !== validApiKey) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return this.historyService.createHistory(createHistoryDto.action, createHistoryDto.userId);
    }

    @Get()
    async findAll(@Query('userId') userId: number, @Query('page') page = 1, @Query('limit') limit = 10) {
        return this.historyService.getHistory(userId, page, limit);
    }

}
