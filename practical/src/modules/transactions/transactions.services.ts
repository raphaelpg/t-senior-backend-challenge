import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private usersRepository: Repository<Transaction>,
    private dataSource: DataSource, 
  ) {}

  save(transaction: Transaction): Promise<Transaction> {
    return this.usersRepository.save(transaction);
  }

  async createMany(transactions: Transaction[]) {
    const queryRunner = this.dataSource.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      transactions.forEach(async (transaction) => {
        await queryRunner.manager.save(transaction);
      });
  
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Transaction[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Transaction | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}