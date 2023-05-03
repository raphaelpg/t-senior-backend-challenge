import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { EthereumModule } from './modules/ethereum/ethereum.module';
import { EthereumService } from './modules/ethereum/ethereum.service';

@Module({
  imports: [
    DatabaseModule,
    TransactionsModule,
    EthereumModule,
  ],
  controllers: [AppController],
  providers: [AppService, EthereumService],
})

export class AppModule implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  onModuleInit() {
    let ethereumService = new EthereumService;
    ethereumService.blockSubscriber([
      ethereumService.parseBlockForDaiTransfers
    ]);
  }
}
