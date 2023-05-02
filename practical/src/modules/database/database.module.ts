import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { TransactionsModule } from '../transactions/transactions.module';
import { Transaction } from '../transactions/transactions.entity';

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
        Transaction
      ],
      synchronize: true,
    }),
    TransactionsModule
  ],
})
export class DatabaseModule {
  constructor() {}
}
