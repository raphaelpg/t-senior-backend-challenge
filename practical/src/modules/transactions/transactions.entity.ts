import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blockNumber: string;
  
  @Column()
  symbol: string;
  
  @Column()
  sender: string;
  
  @Column()
  recipient: string;
  
  @Column()
  amount: string;
  
  @Column()
  decimals: number;

  @Column()
  tx_hash: string;

  @Column()
  date: string;

  @Column()
  timestamp: string;
}
