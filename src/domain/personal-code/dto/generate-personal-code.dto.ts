import { IsEnum, IsString, Matches } from 'class-validator';
import { Gender } from '../enum/gender.enum';

export class GeneratePersonalCodeDto {
  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @Matches(/^\d{2}\.\d{2}\.\d{4}$/, {
    message: 'Invalid date format. Expected format: DD.MM.YYYY',
  })
  dateOfBirth: string;

  @IsString()
  countryCode: string;
}
