import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './requests.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private usersRepository: Repository<Request>,
    private dataSource: DataSource, 
  ) {}

  save = (request: any): Promise<Request> => {
    return this.usersRepository.save(request);
  }

  findOne = (id: number): Promise<Request | null> => {
    return this.usersRepository.findOneBy({ id });
  }

  findAll = (): Promise<Request[]> => {
    return this.usersRepository.find();
  }

  remove = async (id: number): Promise<void> => {
    await this.usersRepository.delete(id);
  }

  // get sum of requests per specific time period
  getSumRequests = async (startDate: Date, endDate: Date): Promise<number> => {
    const query = `SELECT COUNT(*) AS count FROM requests WHERE timestamp BETWEEN '${startDate}' AND '${endDate}'`;
    const result = await this.dataSource.query(query);
    return result[0].count;
  }
}
