import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from "../services/upload";

@Controller('api/upload')
export class UploadController {
    constructor(private readonly playerService: UploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadPdf(@UploadedFile() file) {
        return this.playerService.uploadPdf(file.buffer);
    }
}
