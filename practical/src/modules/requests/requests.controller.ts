import { Controller, Get, Param } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
  ) {}

  // Get sum of all requests per specific time period
  @Get('sum/:startDate/:endDate')
  getSumRequests(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date
  ): Promise<number> {
    return this.requestsService.getSumRequests(startDate, endDate);
  }

}
