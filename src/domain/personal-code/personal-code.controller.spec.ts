import { Test, TestingModule } from '@nestjs/testing';
import { PersonalCodeController } from './personal-code.controller';
import { PersonalCodeModule } from './personal-code.module';
import { DatabaseModule } from '../../core/database/database.module';
import { Gender } from './enum/gender.enum';

describe('PersonalCodeController', () => {
  let controller: PersonalCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PersonalCodeModule, DatabaseModule],
      controllers: [PersonalCodeController],
    }).compile();

    controller = module.get<PersonalCodeController>(PersonalCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/personal-code/validate', () => {
    it.each([
      {
        personalCode: '12345678910',
        countryCode: 'EE',
        validExpectation: false,
      },
      {
        personalCode: '39610222727',
        validExpectation: true,
        countryCode: 'EE',
      },
      {
        personalCode: '39610222222',
        validExpectation: false,
        countryCode: 'EE',
      },
      {
        personalCode: '49207216019',
        validExpectation: true,
        countryCode: 'EE',
      },
    ])('', async ({ personalCode, countryCode, validExpectation }) => {
      const result = await controller.validatePersonalCode({
        personalCode,
        countryCode,
      });

      expect(result.isValid).toBe(validExpectation);
    });
  });

  describe('/personal-code/generate', () => {
    it.each([
      {
        gender: Gender.MALE,
        dateOfBirth: '21.01.1999',
        countryCode: 'EE',
        success: true,
      },
      {
        gender: Gender.FEMALE,
        dateOfBirth: '22.11.1999',
        countryCode: 'EE',
        success: true,
      },
      {
        gender: Gender.MALE,
        dateOfBirth: '21.11.1999',
        countryCode: 'GB',
        success: false,
      },
    ])(
      'should generate a valid personal code without duplicates for $gender born on $dateOfBirth',
      async ({ gender, dateOfBirth, countryCode, success }) => {
        if (success) {
          const result = await controller.generatePersonalCode({
            gender,
            dateOfBirth,
            countryCode,
          });
          expect(result.personalCode).toBeDefined();
        } else {
          await expect(
            controller.generatePersonalCode({
              gender,
              dateOfBirth,
              countryCode,
            }),
          ).rejects.toThrow();
        }
      },
    );
  });
});
