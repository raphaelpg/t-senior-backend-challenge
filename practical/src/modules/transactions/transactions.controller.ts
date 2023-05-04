import { Controller, Get, Param } from '@nestjs/common';
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
  @Get('last/:page')
  getLastTransactions(@Param('page') page: number): Promise<Transaction[]> {
    return this.transactionService.findLastWithPagination(page, 100);
  }

  // Get last 100 transactions with pagination
  @Get('last/:page/:limit')
  getLastTransactionsWithPagination(@Param('page') page: number, @Param('limit') limit: number): Promise<Transaction[]> {
    return this.transactionService.findLastWithPagination(page, limit);
  }
  
}
