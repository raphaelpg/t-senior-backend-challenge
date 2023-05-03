import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {

  formatLogs(logs: any[]) {
    return logs.map((log) => {
      let formattedLog = {
        hash: log.transactionHash,
        blockNumber: log.blockNumber,
        sender: log.from,
        recipient: log.to,
        amount: log.value,
      };
      return formattedLog;
    });
  }
}
