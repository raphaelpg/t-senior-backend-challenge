import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  blockNumber: number;

  @Column()
  sender: string;

  @Column()
  recipient: string;

  @Column()
  amount: number;

  @Column()
  timestamp: number;
}
