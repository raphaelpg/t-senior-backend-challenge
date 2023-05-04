import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { TransactionsService } from '../transactions/transactions.services';
import { EthereumService } from '../ethereum/ethereum.service';
import { DAI_CONTRACT_ADDRESS } from '../../utils/constants';
import daiAbi from '../../contracts/abi/dai.json';

@Injectable()
export class DaiService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly transactionsService: TransactionsService,
    private readonly ethereumService: EthereumService
  ) {}

  parseBlockForDaiTransfers = async (blockNumber: number) => {
    let usedBlock = parseInt(blockNumber.toString());

    try {
      const logs = await this.ethereumService.getBlockLogs(usedBlock);
      const transferLogs = this.ethereumService.filterLogsByEvent(logs, daiAbi, "Transfer");
      const daiLogs = this.ethereumService.filterLogsByAddress(transferLogs, DAI_CONTRACT_ADDRESS);
      const parsedLogs = this.ethereumService.parseLogsData(daiLogs, daiAbi);
      const formattedLogs = this.databaseService.formatLogs(parsedLogs, "DAI", 18);
      if (formattedLogs.length > 0) {
        this.transactionsService.createMany(formattedLogs);
      }
      console.log('Dai transactions found:', formattedLogs.length)
      return daiLogs;

    } catch (error) {
      console.log('error', error)
    }
  }
}
