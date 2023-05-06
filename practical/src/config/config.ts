import 'dotenv/config';

export const config = {
  port: 3000,
  database: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  throttle: {
    ttl: 60,
    limit: 10
  },
  transactions: {
    defaultLimit: 100,
  },
  auth: {
    apiKeyName: 'apiKey',
  },
  web3: {
    providerUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    mainnetDaiContractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'.toLocaleLowerCase(),
  },
};