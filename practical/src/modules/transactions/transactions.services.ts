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

  save = (transaction: any): Promise<Transaction> => {
    return this.usersRepository.save(transaction);
  }

  createMany = async (transactions: any[]) => {
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

  findOne = (id: number): Promise<Transaction | null> => {
    return this.usersRepository.findOneBy({ id });
  }

  findAll = (): Promise<Transaction[]> => {
    return this.usersRepository.find();
  }

  // find last 100 transactions with pagination
  findLastWithPagination = (page: number, limit: number): Promise<Transaction[]> => {
    return this.usersRepository.find({
      order: {
        id: "DESC"
      },
      take: limit,
      skip: (page - 1) * limit
    });
  }

  // find all by sender or recipient address
  findAllByAddress = (address: string): Promise<Transaction[]> => {
    return this.usersRepository.find({
      where: [
        { sender: address },
        { recipient: address }
      ],
      order: {
        id: "DESC"
      }
    });
  }
  
  // find address' total balance
  findTotalBalanceByAddress = async (address: string): Promise<string> => {
    const totalSent = await this.usersRepository.createQueryBuilder("transaction")
      .select("SUM(transaction.amount)", "total")
      .where("transaction.sender = :address", { address })
      .getRawOne();
    const bigSent = totalSent?.total !== null ? BigInt(totalSent?.total) : BigInt('0');
    
    const totalReceived = await this.usersRepository.createQueryBuilder("transaction")
      .select("SUM(transaction.amount)", "total")
      .where("transaction.recipient = :address", { address })
      .getRawOne();
    const bigReceived = totalReceived?.total !== null ? BigInt(totalReceived?.total) : BigInt('0');
    
    return (bigReceived - bigSent).toString();
  }

  remove = async (id: number): Promise<void> => {
    await this.usersRepository.delete(id);
  }
}