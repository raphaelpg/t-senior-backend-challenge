import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { DaiTransactionsModule } from '../dai-transactions/dai-transactions.module';
import { DaiTransactions } from '../dai-transactions/entity/dai-transactions/dai-transactions';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        DaiTransactions
      ],
      synchronize: true,
    }),
    DaiTransactionsModule
  ],
})
export class DatabaseModule {
  constructor() {
    console.log('connect to MySQL database');
    console.log('create DAI txs table');
    console.log('create API keys table');
  }
}
