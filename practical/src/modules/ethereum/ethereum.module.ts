import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { DatabaseModule } from '../database/database.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [DatabaseModule, TransactionsModule],
  providers: [EthereumService],
  exports: [EthereumService],
})
export class EthereumModule {}
