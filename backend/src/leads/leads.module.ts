import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { GhlModule } from '../ghl/ghl.module';

@Module({
  imports: [GhlModule],
  controllers: [LeadsController],
})
export class LeadsModule {}
