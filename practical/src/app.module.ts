import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { EthereumModule } from './modules/ethereum/ethereum.module';
import { EthereumService } from './modules/ethereum/ethereum.service';
import { DatabaseService } from './modules/database/database.service';
import { DaiModule } from './modules/dai/dai.module';
import { DaiService } from './modules/dai/dai.service';

@Module({
  imports: [
    DatabaseModule,
    TransactionsModule,
    EthereumModule,
    DaiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    EthereumService, 
    DatabaseService, 
    DaiService,
  ],
})

export class AppModule implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  onModuleInit() {}
}
