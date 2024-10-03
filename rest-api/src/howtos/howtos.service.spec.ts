import { Test, TestingModule } from '@nestjs/testing';
import { HowtosService } from './howtos.service';

describe('HowtosService', () => {
  let service: HowtosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HowtosService],
    }).compile();

    service = module.get<HowtosService>(HowtosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
