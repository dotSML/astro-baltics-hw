import { Injectable } from '@nestjs/common';
import { PersonalCodeFactory } from './personal-code.factory';
import { Gender } from './enum/gender.enum';
import { InjectModel } from '@nestjs/sequelize';
import { PersonalCodeModel } from './personal-code.model';

@Injectable()
export class PersonalCodeService {
  constructor(
    private readonly personalCodeFactory: PersonalCodeFactory,
    @InjectModel(PersonalCodeModel)
    private readonly personalCodeModel: typeof PersonalCodeModel,
  ) {}

  public validatePersonalCode(
    personalCode: string,
    countryCode: string,
  ): { isValid: boolean } {
    const strategy = this.personalCodeFactory.getStrategy(countryCode);
    return strategy.validate(personalCode);
  }

  public async generate(
    gender: Gender,
    dateOfBirth: string,
    countryCode: string,
  ): Promise<{ personalCode: string }> {
    let isUnique = false;
    let personalCode = '';
    const strategy = this.personalCodeFactory.getStrategy(countryCode);

    while (!isUnique) {
      personalCode = strategy.generate(
        gender,
        dateOfBirth,
        countryCode,
      ).personalCode;

      const existingPersonalCode = await this.personalCodeModel.findOne({
        where: { personalCode },
      });

      if (!existingPersonalCode) {
        isUnique = true;
      }
    }

    await this.personalCodeModel.create({ personalCode, countryCode, gender });

    return { personalCode };
  }
}
