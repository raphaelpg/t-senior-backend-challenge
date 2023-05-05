import { Transaction } from "src/modules/transactions/transactions.entity";

export const formatLogs = (logs: any[], tokenName: string, tokenDecimals: number) => {
  return logs.map((log) => {
    let formattedLog = {
      blockNumber: log.blockNumber,
      symbol: tokenName,
      sender: log.from,
      recipient: log.to,
      amount: log.value,
      decimals: tokenDecimals,
      tx_hash: log.transactionHash,
      date: new Date().toUTCString(),
      timestamp: new Date().getTime(),
    };
    return formattedLog;
  }).map((log) => {
    const transaction = new Transaction();
    Object.assign(transaction, log);
    return transaction;
  });
}