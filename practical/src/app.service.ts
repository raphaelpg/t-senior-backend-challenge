import { Injectable, OnModuleInit } from '@nestjs/common';
import { EthereumService } from './modules/ethereum/ethereum.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly ethereumService: EthereumService,
  ) {}
  
  onModuleInit() {
    this.ethereumService.blockSubscriber([
      this.ethereumService.parseBlockForDaiTransfers
    ]);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
