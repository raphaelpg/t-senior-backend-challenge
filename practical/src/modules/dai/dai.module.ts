import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EthereumModule } from '../ethereum/ethereum.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { DaiService } from './dai.service';

@Module({
  imports: [
    DatabaseModule, 
    EthereumModule,
    TransactionsModule
  ],
  exports: [DaiModule],
  providers: [DaiService]
})
export class DaiModule {}
