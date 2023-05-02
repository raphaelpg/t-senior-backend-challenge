import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private usersRepository: Repository<Transaction>,
  ) {}

  save(transaction: Transaction): Promise<Transaction> {
    return this.usersRepository.save(transaction);
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