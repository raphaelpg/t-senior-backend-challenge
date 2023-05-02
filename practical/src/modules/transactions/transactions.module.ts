import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { TransactionsService } from './transactions.services';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  // controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}