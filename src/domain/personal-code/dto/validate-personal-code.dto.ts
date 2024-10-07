import { IsString } from 'class-validator';

export class ValidatePersonalCodeDto {
  @IsString()
  personalCode: string;

  @IsString()
  countryCode: string;
}
