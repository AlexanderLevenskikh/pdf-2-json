import { Module } from '@nestjs/common';
import { UploadController } from "../controllers/upload";
import { UploadService } from "../services/upload";

@Module({
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {
}
