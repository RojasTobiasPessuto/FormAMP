import {
  Body,
  Controller,
  Logger,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GhlService } from '../ghl/ghl.service';

@Controller('leads')
export class LeadsController {
  private readonly logger = new Logger(LeadsController.name);

  constructor(private readonly ghl: GhlService) {}

  @Post('submit')
  @UseInterceptors(FilesInterceptor('cv_upload', 5))
  async submit(@Body() body: any, @UploadedFiles() files: Express.Multer.File[]) {
    this.logger.log(`SUBMIT recibido: email=${body.email} phone=${body.telefono}`);
    this.logger.log(`Files recibidos: ${files?.length ?? 0}`);

    // ⚠️ Por ahora NO subimos archivos a GHL (FILE_UPLOAD),
    // primero creemos el contacto y guardemos los demás fields.
    const res = await this.ghl.upsertContactFromLanding(body);

    return { ok: true, ghl: res };
  }
}
