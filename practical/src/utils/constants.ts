import 'dotenv/config';

export const WEB3_PROVIDER_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
export const DAI_CONTRACT_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'.toLocaleLowerCase();