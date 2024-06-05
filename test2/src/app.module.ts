import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
