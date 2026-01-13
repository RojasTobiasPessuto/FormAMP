// src/ghl/ghl.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GhlService } from './ghl.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GhlService],
  exports: [GhlService],
})
export class GhlModule {}
