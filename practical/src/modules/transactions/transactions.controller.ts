import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.services';
import { Transaction } from './transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Get()
  getHello(): string {
    return 'Get Transactions';
  }

  // Get last 100 transactions
  @Get('last')
  getLastTransactions(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }
}
