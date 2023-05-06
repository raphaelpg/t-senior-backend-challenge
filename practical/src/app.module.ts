import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { EthereumModule } from './modules/ethereum/ethereum.module';
import { EthereumService } from './modules/ethereum/ethereum.service';
import { DaiModule } from './modules/dai/dai.module';
import { DaiService } from './modules/dai/dai.service';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottleModule } from './modules/throttle/throttle.module';
import { RequestsModule } from './modules/requests/requests.module';

@Module({
  imports: [
    DatabaseModule,
    TransactionsModule,
    EthereumModule,
    DaiModule,
    AuthModule,
    ThrottleModule,
    RequestsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    EthereumService, 
    DaiService,
  ],
})

export class AppModule implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  onModuleInit() {}
}
