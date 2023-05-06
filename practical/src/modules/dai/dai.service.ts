import { Injectable, Logger } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.services';
import { EthereumService } from '../ethereum/ethereum.service';
import { DAI_CONTRACT_ADDRESS } from '../../utils/constants';
import { formatLogs } from '../../utils/formatting';
import daiAbi from '../../contracts/abi/dai.json';

@Injectable()
export class DaiService {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly ethereumService: EthereumService
  ) {}

  private readonly logger = new Logger(DaiService.name)

  parseBlockForDaiTransfers = async (blockNumber: number) => {
    let usedBlock = parseInt(blockNumber.toString());

    try {
      const logs = await this.ethereumService.getBlockLogs(usedBlock);
      const transferLogs = this.ethereumService.filterLogsByEvent(logs, daiAbi, "Transfer");
      const daiLogs = this.ethereumService.filterLogsByAddress(transferLogs, DAI_CONTRACT_ADDRESS);
      const parsedLogs = this.ethereumService.parseLogsData(daiLogs, daiAbi);
      const formattedLogs = formatLogs(parsedLogs, "DAI", 18);
      if (formattedLogs.length > 0) {
        this.transactionsService.createMany(formattedLogs);
      }
      this.logger.log('Dai transactions found: ' + formattedLogs.length)
      return daiLogs;
    } catch (error) {
      this.logger.error('Error parsing block for Dai transfers:', error)
    }
  }
}
