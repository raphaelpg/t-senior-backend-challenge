import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  
  onModuleInit() {
    console.log('connect to MySQL database');
    console.log('create DAI txs table');
    console.log('create API keys table');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
