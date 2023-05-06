import { Controller, Get, Param } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
  ) {}

  // Get average number of requests per specific timeframe
  @Get('average/:timeframe')
  getAverageRequests(
    @Param('timeframe') timeframe: string
  ): Promise<number> {
    return this.requestsService.getAverageRequests(timeframe);
  }

  // Get sum of all requests per specific time period
  @Get('sum/:startDate/:endDate')
  getSumRequests(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date
  ): Promise<number> {
    return this.requestsService.getSumRequests(startDate, endDate);
  }

  // Get most used api key by number of requests
  @Get('most')
  getMostUsedApiKey(): Promise<string> {
    return this.requestsService.getMostUsedApiKey();
  }
}
