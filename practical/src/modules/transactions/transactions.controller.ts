import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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

  // Get all transactions by address
  @Get('address/:address')
  getAllTransactionsByAddress(@Param('address') address: string): Promise<Transaction[]> {
    return this.transactionService.findAllByAddress(address);
  }

  // Get address balance
  @Get('balance/:address')
  getAddressBalance(@Param('address') address: string): Promise<string> {
    console.log("address: ", address)
    return this.transactionService.findTotalBalanceByAddress(address);
  }
  
}
