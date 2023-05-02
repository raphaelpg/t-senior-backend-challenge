import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dai_transactions')
export class DaiTransactions {
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
