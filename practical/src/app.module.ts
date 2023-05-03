import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { EthereumModule } from './modules/ethereum/ethereum.module';
import { EthereumService } from './modules/ethereum/ethereum.service';
import { DatabaseService } from './modules/database/database.service';

@Module({
  imports: [
    DatabaseModule,
    TransactionsModule,
    EthereumModule,
  ],
  controllers: [AppController],
  providers: [AppService, EthereumService, DatabaseService],
})

export class AppModule implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  onModuleInit() {
    let databaseService = new DatabaseService();
    let ethereumService = new EthereumService(databaseService);
    ethereumService.blockSubscriber([
      ethereumService.parseBlockForDaiTransfers
    ]);
  }
}
