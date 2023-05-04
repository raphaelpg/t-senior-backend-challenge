import { Injectable } from '@nestjs/common';
import { Transaction } from '../transactions/transactions.entity';

@Injectable()
export class DatabaseService {

  formatLogs = (logs: any[], tokenName: string, tokenDecimals: number) => {
    return logs.map((log) => {
      let formattedLog = {
        blockNumber: log.blockNumber,
        symbol: tokenName,
        sender: log.from,
        recipient: log.to,
        amount: log.value,
        decimals: tokenDecimals,
        tx_hash: log.transactionHash,
        timestamp: new Date().toUTCString(),
      };
      return formattedLog;
    }).map((log) => {
      const transaction = new Transaction();
      Object.assign(transaction, log);
      return transaction;
    });
  }
}
