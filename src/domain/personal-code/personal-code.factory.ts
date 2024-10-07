import { Injectable } from '@nestjs/common';
import { PersonalCodeStrategy } from './personal-code.strategy';
import { EstonianPersonalCodeStrategy } from './strategies/estonian-personal-code.strategy';

@Injectable()
export class PersonalCodeFactory {
  public getStrategy(countryCode: string): PersonalCodeStrategy {
    switch (countryCode) {
      case 'EE':
        return new EstonianPersonalCodeStrategy();
      default:
        throw new Error('Unsupported country code');
    }
  }
}
