import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { TransactionsModule } from '../transactions/transactions.module';
import { Transactions } from '../transactions/entity/transactions/transactions';

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
        Transactions
      ],
      synchronize: true,
    }),
    TransactionsModule
  ],
})
export class DatabaseModule {
  constructor() {}
}
