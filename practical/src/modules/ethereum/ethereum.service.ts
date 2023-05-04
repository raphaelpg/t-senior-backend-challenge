import { ethers } from 'ethers';
import { Injectable } from '@nestjs/common';
import { WEB3_PROVIDER_URL } from '../../utils/constants';

@Injectable()
export class EthereumService {
  constructor() {}

  private provider = new ethers.providers.JsonRpcProvider(WEB3_PROVIDER_URL);

  blockSubscriber = async (callback: any[]) => {
    this.provider.on('block', (blockNumber) => {
      console.log('New block mined: ' + blockNumber);
      callback?.forEach((cb) => {
        cb(blockNumber);
      });
    });
  }
  
  getBlockNumber = async () => {
    const blockNumber = await this.provider.getBlockNumber();
    return blockNumber;
  }

  getBlockLogs = async (block: number) => {
    const logs = await this.provider.getLogs({fromBlock: block, toBlock: block});
    return logs;
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
}
