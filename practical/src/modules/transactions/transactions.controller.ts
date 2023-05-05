import { Controller, Get, Headers, Logger, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.services';
import { Transaction } from './transactions.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}
  private readonly logger = new Logger(TransactionsController.name)

  @Get()
  getHello(
    @Headers('api-key') apiKey: string
  ): string {
    this.logger.log('Get Transactions, api-key: ' + apiKey);
    return 'Get Transactions';
  }

  // Get last 100 transactions
  @Get('last/:page')
  @UseGuards(AuthGuard('api-key'))
  getLastTransactions(
    @Headers('api-key') apiKey: string,
    @Param('page') page: number
  ): Promise<Transaction[]> {
    this.logger.log('getLastTransactions, api-key: ' + apiKey);
    return this.transactionService.findLastWithPagination(page, 100);
  }

  // Get last 100 transactions with pagination
  @Get('last/:page/:limit')
  getLastTransactionsWithPagination(
    @Headers('api-key') apiKey: string, 
    @Param('page') page: number, 
    @Param('limit') limit: number
  ): Promise<Transaction[]> {
    this.logger.log('getLastTransactionsWithPaginationn, api-key: ' + apiKey);
    return this.transactionService.findLastWithPagination(page, limit);
  }

  // Get all transactions by address
  @Get('address/:address')
  @UseGuards(AuthGuard('api-key'))
  getAllTransactionsByAddress(
    @Headers('api-key') apiKey: string, 
    @Param('address') address: string
  ): Promise<Transaction[]> {
    this.logger.log('getAllTransactionsByAddress, api-key: ' + apiKey);
    return this.transactionService.findAllByAddress(address);
  }

  // Get address balance
  @Get('balance/:address')
  @UseGuards(AuthGuard('api-key'))
  getAddressBalance(
    @Headers('api-key') apiKey: string, 
    @Param('address') address: string
  ): Promise<string> {
    this.logger.log('getAddressBalance, api-key: ' + apiKey);
    return this.transactionService.findTotalBalanceByAddress(address);
  }
}
