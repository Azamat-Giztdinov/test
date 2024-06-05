import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.SERVER2_PORT || 3001;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`History service is running on port ${PORT}`));
}
bootstrap();
