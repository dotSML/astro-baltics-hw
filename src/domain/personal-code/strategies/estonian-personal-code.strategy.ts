import { Injectable, Logger } from '@nestjs/common';
import { PersonalCodeStrategy } from '../personal-code.strategy';
import { Gender } from '../enum/gender.enum';
import { parseDate } from '../../../core/utils/date.utils';
import { PersonalCodeModel } from '../personal-code.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EstonianPersonalCodeStrategy extends PersonalCodeStrategy {
  constructor(
    @InjectModel(PersonalCodeModel)
    private personalCodeModel: typeof PersonalCodeModel,
  ) {
    super();
  }
  private logger = new Logger(EstonianPersonalCodeStrategy.name);
  public validate(personalCode: string): {
    isValid: boolean;
    gender?: Gender;
    dateOfBirth?: string;
    serialNumber?: number;
  } {
    try {
      if (!/^\d{11}$/.test(personalCode)) {
        this.logger.error({
          message: 'Invalid personal code format',
          personalCode,
        });
        return { isValid: false };
      }

      const digits = personalCode.split('').map((char) => parseInt(char, 10));
      const controlNumber = this.calculateControlNumber(digits);

      if (controlNumber !== digits[10]) {
        this.logger.error({
          message: 'Invalid control number',
          personalCode,
          controlNumber,
        });
        return { isValid: false };
      }
      const { formattedDateString } =
        this.extractDateFromPersonalCode(personalCode);
      const serialNumber = this.getSerial(personalCode);

      const gender = this.getGender(personalCode);

      return {
        isValid: true,
        gender,
        dateOfBirth: formattedDateString,
        serialNumber,
      };
    } catch (e) {
      console.log(e);
      this.logger.error({
        message: 'Error validating personal code',
        personalCode,
        error: e,
      });
      return { isValid: false };
    }
  }

  public generate(
    gender: Gender,
    dateOfBirth: string,
  ): { personalCode: string } {
    const { year, month, day } = parseDate(dateOfBirth);
    const century = Math.floor(year / 100) * 100;
    const genderCode = this.getGenderCode(gender, century);

    const dateDigits = this.generateDateDigits(year, month, day);
    const serialNumber = this.generateSerialNumber();

    const partialPersonalCode = `${genderCode}${dateDigits.yearDigits}${dateDigits.monthDigits}${dateDigits.dayDigits}${serialNumber}`;
    const allDigits = partialPersonalCode
      .split('')
      .map((char) => parseInt(char, 10));
    const controlNumber = this.calculateControlNumber(allDigits);

    const personalCode = `${partialPersonalCode}${controlNumber}`;

    return { personalCode };
  }

  private generateDateDigits(
    year: number,
    month: number,
    day: number,
  ): {
    yearDigits: string;
    monthDigits: string;
    dayDigits: string;
  } {
    const yearDigits = (year % 100).toString().padStart(2, '0');
    const monthDigits = month.toString().padStart(2, '0');
    const dayDigits = day.toString().padStart(2, '0');

    return {
      yearDigits,
      monthDigits,
      dayDigits,
    };
  }

  private extractDateFromPersonalCode(personalCode: string): {
    year: number;
    month: number;
    day: number;
    formattedDateString: string;
  } {
    const genderCode = personalCode[0];

    const year =
      this.getBirthCentury(parseInt(genderCode)) +
      parseInt(personalCode.substring(1, 3), 10);
    const month = parseInt(personalCode.substring(3, 5), 10);
    const day = parseInt(personalCode.substring(5, 7), 10);

    return parseDate(`${day}.${month}.${year}`);
  }

  private getGender(personalCode: string): Gender {
    const genderCode = parseInt(personalCode[0], 10);
    return genderCode % 2 === 0 ? Gender.FEMALE : Gender.MALE;
  }

  private getSerial(personalCode: string): number {
    return parseInt(personalCode.substring(7, 10), 10);
  }

  private getBirthCentury(genderCode: number): number {
    if (genderCode === 1 || genderCode === 2) return 1800;
    if (genderCode === 3 || genderCode === 4) return 1900;
    if (genderCode === 5 || genderCode === 6) return 2000;
    if (genderCode === 7 || genderCode === 8) return 2100;
    throw new Error('Invalid gender code');
  }

  private calculateControlNumber(digits: number[]): number {
    const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    const weights2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];

    let sum = digits
      .slice(0, 10)
      .reduce((acc, digit, idx) => acc + digit * weights1[idx], 0);
    let mod = sum % 11;

    if (mod === 10) {
      sum = digits
        .slice(0, 10)
        .reduce((acc, digit, idx) => acc + digit * weights2[idx], 0);
      mod = sum % 11;
      if (mod === 10) {
        mod = 0;
      }
    }

    return mod;
  }

  private getGenderCode(gender: Gender, century: number): number {
    const genderOffset = gender === Gender.MALE ? 0 : 1;
    switch (century) {
      case 1800:
        return 1 + genderOffset;
      case 1900:
        return 3 + genderOffset;
      case 2000:
        return 5 + genderOffset;
      default:
        throw new Error('Invalid century');
    }
  }

  private generateSerialNumber(): string {
    return Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
  }
}
