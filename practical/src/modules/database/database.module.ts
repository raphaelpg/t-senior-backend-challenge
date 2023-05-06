import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from '../transactions/transactions.module';
import { config } from '../../config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TransactionsModule,
  ],
})
export class DatabaseModule {
  constructor() {}
}
