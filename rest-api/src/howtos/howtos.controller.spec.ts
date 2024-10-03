import { Test, TestingModule } from '@nestjs/testing';
import { HowtosController } from './howtos.controller';
import { HowtosService } from './howtos.service';

describe('HowtosController', () => {
  let controller: HowtosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HowtosController],
      providers: [HowtosService],
    }).compile();

    controller = module.get<HowtosController>(HowtosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
