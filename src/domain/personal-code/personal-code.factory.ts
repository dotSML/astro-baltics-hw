import { Injectable } from '@nestjs/common';
import { PersonalCodeStrategy } from './personal-code.strategy';
import { EstonianPersonalCodeStrategy } from './strategies/estonian-personal-code.strategy';
import { PersonalCodeModel } from './personal-code.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PersonalCodeFactory {
  constructor(
    private readonly estonianPersonalCodeStrategy: EstonianPersonalCodeStrategy,
  ) {}
  public getStrategy(countryCode: string): PersonalCodeStrategy {
    switch (countryCode) {
      case 'EE':
        return this.estonianPersonalCodeStrategy;
      default:
        throw new Error('Unsupported country code');
    }
  }
}
