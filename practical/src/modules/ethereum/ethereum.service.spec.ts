import { Test, TestingModule } from '@nestjs/testing';
import { EthereumService } from './ethereum.service';

describe('EthereumService', () => {
  let service: EthereumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EthereumService],
    }).compile();

    service = module.get<EthereumService>(EthereumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return block number', async () => {
    const blockNumber = await service.getBlockNumber();
    expect(blockNumber).toBeDefined();
  });

});
