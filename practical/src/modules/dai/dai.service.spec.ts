import { Test, TestingModule } from '@nestjs/testing';
import { DaiService } from './dai.service';

describe('DaiService', () => {
  let service: DaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaiService],
    }).compile();

    service = module.get<DaiService>(DaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
