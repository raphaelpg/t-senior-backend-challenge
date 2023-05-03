import { ethers } from 'ethers';
import { Injectable } from '@nestjs/common';
import daiAbi from '../../contracts/abi/dai.json';
import { WEB3_PROVIDER_URL, DAI_CONTRACT_ADDRESS } from '../../utils/constants';
import { DatabaseService } from '../database/database.service';
import { TransactionsService } from '../transactions/transactions.services';

@Injectable()
export class EthereumService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly transactionsService: TransactionsService,
  ) {}

  blockSubscriber = async (callback: any[]) => {
    const provider = new ethers.providers.JsonRpcProvider(WEB3_PROVIDER_URL);
    
    provider.on('block', (blockNumber) => {
      console.log('New block mined: ' + blockNumber);
      callback?.forEach((cb) => {
        cb(blockNumber);
      });
    });
  }
  
  getBlockNumber = async () => {
    const provider = new ethers.providers.JsonRpcProvider(WEB3_PROVIDER_URL);
    const blockNumber = await provider.getBlockNumber();
    console.log('Current block number: ' + blockNumber);
    return blockNumber;
  }
  
  filterLogsByEvent = (logs: any[], abi: any, eventName: string) => {
    let contractInterface = new ethers.utils.Interface(abi);
    const filteredLogs = logs.filter(log => {
      try {
        const parsedLog = contractInterface.parseLog(log);
        return (parsedLog && parsedLog.name.toLocaleLowerCase() === eventName.toLocaleLowerCase())
      } catch (error) {
      }
    })
    return filteredLogs;
  }

  filterLogsByAddress = (logs: any[], address: string) => {
    const filteredLogs = logs.filter(tx => {
      return tx.address.toLowerCase() === address.toLowerCase();
    })
    return filteredLogs;
  }

  parseLogsData = (logs: any[], abi: any) => {
    logs.forEach(log => {
      let contractInterface = new ethers.utils.Interface(abi);
      const parsedLog = contractInterface.parseLog(log);
      
      log.from = parsedLog?.args[0]?.toLowerCase();
      log.to = parsedLog?.args[1]?.toLowerCase();
      log.value = parsedLog?.args[2]?.toString();
    });
    return logs;
  }

  parseBlockForDaiTransfers = async (blockNumber: number) => {
    const provider = new ethers.providers.JsonRpcProvider(WEB3_PROVIDER_URL);
    let usedBlock = parseInt(blockNumber.toString());

    try {
      const logs: any[] = await provider.getLogs({fromBlock: usedBlock, toBlock: usedBlock});
      const transferLogs = this.filterLogsByEvent(logs, daiAbi, "Transfer");
      const daiLogs = this.filterLogsByAddress(transferLogs, DAI_CONTRACT_ADDRESS);
      const parsedLogs = this.parseLogsData(daiLogs, daiAbi);
      const formattedLogs = this.databaseService.formatLogs(parsedLogs);
      if (formattedLogs.length > 0) {
        this.transactionsService.createMany(formattedLogs);
      }
      console.log('dai transactions found:', formattedLogs.length)
      return daiLogs;

    } catch (error) {
      console.log('error', error)
    }
  }
}
