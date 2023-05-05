import { Controller, Get, Headers, Logger, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.services';
import { Transaction } from './transactions.entity';
import { AuthGuard } from '@nestjs/passport';
import { RequestsService } from '../requests/requests.service';
import { formatRequests } from '../../utils/formatting';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly transactionService: TransactionsService
  ) {}
  private readonly logger = new Logger(TransactionsController.name)

  @Get()
  getHello(
    @Headers('apiKey') apiKey: string
  ): string {
    const requestApiKey = apiKey || 'no api key';
    this.logger.log('transactions/, apiKey: ' + requestApiKey);
    this.requestsService.save(formatRequests('transactions/', requestApiKey));
    return 'Get Transactions';
  }

  // Get last 100 transactions
  @Get('last/:page')
  @UseGuards(AuthGuard('apiKey'))
  getLastTransactions(
    @Headers('apiKey') apiKey: string,
    @Param('page') page: number
  ): Promise<Transaction[]> {
    const requestApiKey = apiKey || 'no api key';
    this.logger.log('transactions/last/:page, apiKey: ' + requestApiKey);
    this.requestsService.save(formatRequests('transactions/last/:page', requestApiKey));
    return this.transactionService.findLastWithPagination(page, 100);
  }

  // Get last 100 transactions with pagination
  @Get('last/:page/:limit')
  getLastTransactionsWithPagination(
    @Headers('apiKey') apiKey: string, 
    @Param('page') page: number, 
    @Param('limit') limit: number
  ): Promise<Transaction[]> {
    const requestApiKey = apiKey || 'no api key';
    this.logger.log('transactions/last/:page/:limit, apiKey: ' + requestApiKey);
    this.requestsService.save(formatRequests('transactions/last/:page/:limit', requestApiKey));
    return this.transactionService.findLastWithPagination(page, limit);
  }

  // Get all transactions by address
  @Get('address/:address')
  @UseGuards(AuthGuard('apiKey'))
  getAllTransactionsByAddress(
    @Headers('apiKey') apiKey: string, 
    @Param('address') address: string
  ): Promise<Transaction[]> {
    const requestApiKey = apiKey || 'no api key';
    this.logger.log('transactions/address/:address, apiKey: ' + requestApiKey);
    this.requestsService.save(formatRequests('transactions/address/:address', requestApiKey));
    return this.transactionService.findAllByAddress(address);
  }

  // Get address balance
  @Get('balance/:address')
  @UseGuards(AuthGuard('apiKey'))
  getAddressBalance(
    @Headers('apiKey') apiKey: string, 
    @Param('address') address: string
  ): Promise<string> {
    const requestApiKey = apiKey || 'no api key';
    this.logger.log('transactions/balance/:address, apiKey: ' + requestApiKey);
    this.requestsService.save(formatRequests('transactions/balance/:address', requestApiKey));
    return this.transactionService.findTotalBalanceByAddress(address);
  }
}