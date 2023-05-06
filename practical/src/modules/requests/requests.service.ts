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

  // get average number of request per specific timeframe
  // getAverageRequests = async (timeframe: string): Promise<number> => {
    // const query = `SELECT COUNT(*) AS count FROM requests WHERE timestamp > NOW() - INTERVAL '${timeframe}'`;
    // const query = `SELECT COUNT(*) AS count FROM requests WHERE timestamp > NOW() - INTERVAL 1 HOUR`;
    // const result = await this.dataSource.query(query);
    // return result[0].count;
  // }

  // get sum of requests per specific time period
  getSumRequests = async (startDate: Date, endDate: Date): Promise<number> => {
    const query = `SELECT COUNT(*) AS count FROM requests WHERE timestamp BETWEEN '${startDate}' AND '${endDate}'`;
    const result = await this.dataSource.query(query);
    return result[0].count;
  }

  // get highest usage 3 hour period for a specific api key
  // getHighestUsagePeriod = async (apiKey: string): Promise<string> => {
    // const query = `SELECT LEFT(TIMESTAMP, 13) AS mtimestamp, COUNT(*) AS count FROM requests WHERE api_key = '${apiKey}' GROUP BY mtimestamp ORDER BY count DESC LIMIT 1`;
    // const result = await this.dataSource.query(query);
    // return result[0].mtimestamp;
  // }

  // get most used api key by number of requests
  getMostUsedApiKey = async (): Promise<string> => {
    const query = `SELECT api_key, COUNT(*) AS count FROM requests GROUP BY api_key ORDER BY count DESC LIMIT 1`;
    const result = await this.dataSource.query(query);
    return result[0].api_key;
  } 
}
