import { ethers } from 'ethers';
import { Injectable } from '@nestjs/common';
import daiAbi from '../../contracts/abi/dai.json';
import { WEB3_PROVIDER_URL, DAI_CONTRACT_ADDRESS } from '../../utils/constants';

@Injectable()
export class EthereumService {

  async blockSubscriber(callback: any[]) {
    const provider = new ethers.providers.JsonRpcProvider(WEB3_PROVIDER_URL);
    
    provider.on('block', (blockNumber) => {
      console.log('New block mined: ' + blockNumber);
      callback?.forEach((cb) => {
        cb(blockNumber);
      });
    });
  }
  
  async getBlockNumber() {
    const provider = new ethers.providers.JsonRpcProvider(WEB3_PROVIDER_URL);
    const blockNumber = await provider.getBlockNumber();
    console.log('Current block number: ' + blockNumber);
    return blockNumber;
  }
  
  filterLogsByEvent(logs: any[], abi: any, eventName: string) {
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

  filterLogsByAddress(logs: any[], address: string) {
    const filteredLogs = logs.filter(tx => {
      return tx.address.toLowerCase() === address.toLowerCase();
    })
    return filteredLogs;
  }

  parseBlockForDaiTransfers = async (blockNumber: number) => {
    const provider = new ethers.providers.JsonRpcProvider(WEB3_PROVIDER_URL);
    let usedBlock = parseInt(blockNumber.toString());

    try {
      const logs: any[] = await provider.getLogs({fromBlock: usedBlock, toBlock: usedBlock});
      const transferLogs = this.filterLogsByEvent(logs, daiAbi, "Transfer");
      const daiLogs = this.filterLogsByAddress(transferLogs, DAI_CONTRACT_ADDRESS);

      console.log('daiLogs.length', daiLogs.length)
      console.log('daiLogs', daiLogs)
      return daiLogs;

    } catch (error) {
      console.log('error', error)
    }
  }
}
