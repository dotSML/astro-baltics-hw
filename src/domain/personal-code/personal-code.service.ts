import { Injectable } from '@nestjs/common';
import { PersonalCodeFactory } from './personal-code.factory';
import { Gender } from './enum/gender.enum';

@Injectable()
export class PersonalCodeService {
  constructor(private readonly personalCodeFactory: PersonalCodeFactory) {}

  public async validatePersonalCode(
    personalCode: string,
    countryCode: string,
  ): Promise<{ isValid: boolean }> {
    const strategy = this.personalCodeFactory.getStrategy(countryCode);
    return strategy.validate(personalCode);
  }

  public async generate(
    gender: Gender,
    dateOfBirth: string,
    countryCode: string,
  ) {
    const strategy = this.personalCodeFactory.getStrategy(countryCode);
    return strategy.generate(gender, dateOfBirth);
  }
}
