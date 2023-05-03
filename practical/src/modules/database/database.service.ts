import { Injectable } from '@nestjs/common';
import { Transaction } from '../transactions/transactions.entity';

@Injectable()
export class DatabaseService {

  formatLogs = (logs: any[]) => {
    return logs.map((log) => {
      let formattedLog = {
        hash: log.transactionHash,
        blockNumber: log.blockNumber,
        sender: log.from,
        recipient: log.to,
        amount: log.value,
        timestamp: new Date().toISOString(),
      };
      return formattedLog;
    }).map((log) => {
      const transaction = new Transaction();
      Object.assign(transaction, log);
      return transaction;
    });
  }
}
