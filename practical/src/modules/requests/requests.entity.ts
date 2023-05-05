import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  api_key: string;
  
  @Column()
  endpoint: string;
  
  @Column()
  date: string;

  @Column()
  timestamp: string;
}
