import { Gender } from './enum/gender.enum';

export abstract class PersonalCodeStrategy {
  abstract validate(personalCode: string): {
    isValid: boolean;
    dateOfBirth?: string;
    gender?: Gender;
    serialNumber?: number;
  };
  abstract generate(
    gender: Gender,
    dateOfBirth: string,
  ): { personalCode: string };
}
