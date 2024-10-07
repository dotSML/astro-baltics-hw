import { Test, TestingModule } from '@nestjs/testing';
import { PersonalCodeService } from './personal-code.service';

describe('PersonalCodeService', () => {
  let service: PersonalCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalCodeService],
    }).compile();

    service = module.get<PersonalCodeService>(PersonalCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
