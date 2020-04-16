import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from '../controllers/app';
import { UploadModule } from "./upload";
import { ReactMiddleware } from "../middlewares/react";

@Module({
  imports: [UploadModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ReactMiddleware).forRoutes(
        {
          path: '/**',
          method: RequestMethod.ALL,
        },
    );
  }
}
