import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EthereumService],
})
export class EthereumModule {}
