import { Injectable, OnModuleInit } from '@nestjs/common';
import { EthereumService } from './modules/ethereum/ethereum.service';

@Injectable()
export class AppService implements OnModuleInit {
  
  onModuleInit() {}

  getHello(): string {
    return 'Hello World!';
  }
}
