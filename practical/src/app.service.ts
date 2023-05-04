import { Injectable, OnModuleInit } from '@nestjs/common';
import { EthereumService } from './modules/ethereum/ethereum.service';
import { DaiService } from './modules/dai/dai.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly ethereumService: EthereumService,
    private readonly daiService: DaiService
  ) {}
  
  onModuleInit() {
    this.ethereumService.blockSubscriber([
      this.daiService.parseBlockForDaiTransfers
    ]);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
