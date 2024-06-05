import { Module } from '@nestjs/common';
import { HistoryModule } from './history/history.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [
    ConfigModule.forRoot({
      load:[configuration],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    HistoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
