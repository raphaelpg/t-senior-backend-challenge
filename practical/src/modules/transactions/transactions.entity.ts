import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  blockNumber: string;

  @Column()
  sender: string;

  @Column()
  recipient: string;

  @Column()
  amount: string;

  @Column()
  timestamp: string;
}
