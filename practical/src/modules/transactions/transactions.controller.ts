import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.services';
import { Transaction } from './transactions.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}
  private readonly logger = new Logger(TransactionsController.name)

  @Get()
  getHello(): string {
    this.logger.log('Get Transactions');
    return 'Get Transactions';
  }

  // Get last 100 transactions
  @Get('last/:page')
  @UseGuards(AuthGuard('api-key'))
  getLastTransactions(@Param('page') page: number): Promise<Transaction[]> {
    this.logger.log('getLastTransactions');
    return this.transactionService.findLastWithPagination(page, 100);
  }

  // Get last 100 transactions with pagination
  @Get('last/:page/:limit')
  getLastTransactionsWithPagination(@Param('page') page: number, @Param('limit') limit: number): Promise<Transaction[]> {
    this.logger.log('getLastTransactionsWithPagination');
    return this.transactionService.findLastWithPagination(page, limit);
  }

  // Get all transactions by address
  @Get('address/:address')
  getAllTransactionsByAddress(@Param('address') address: string): Promise<Transaction[]> {
    this.logger.log('getAllTransactionsByAddress');
    return this.transactionService.findAllByAddress(address);
  }

  // Get address balance
  @Get('balance/:address')
  getAddressBalance(@Param('address') address: string): Promise<string> {
    this.logger.log('getAddressBalance');
    return this.transactionService.findTotalBalanceByAddress(address);
  }
  
}
