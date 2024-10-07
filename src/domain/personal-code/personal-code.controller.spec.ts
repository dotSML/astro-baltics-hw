import { Test, TestingModule } from '@nestjs/testing';
import { PersonalCodeController } from './personal-code.controller';

describe('PersonalCodeController', () => {
  let controller: PersonalCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalCodeController],
    }).compile();

    controller = module.get<PersonalCodeController>(PersonalCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
