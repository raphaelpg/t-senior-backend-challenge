import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { DaiTransactionsModule } from './modules/dai-transactions/dai-transactions.module';

@Module({
  imports: [
    DatabaseModule,
    DaiTransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  onModuleInit() {}
}
