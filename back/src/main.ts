import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import * as path from "path";

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

async function bootstrap() {
  const port = process.env.APP_PORT || 5000;
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
  console.log(`App listens on ${port}`);
}
bootstrap();
