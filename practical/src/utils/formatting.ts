import { Request } from "../modules/requests/requests.entity";
import { Transaction } from "../modules/transactions/transactions.entity";

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

export const formatRequests = (method: string, apiKey: string) => {
  const params = {
    api_key: apiKey,
    endpoint: method,
    date: new Date().toUTCString(),
    timestamp: new Date().getTime(),
  }
  const request = new Request();
  Object.assign(request, params);
  return request;
}