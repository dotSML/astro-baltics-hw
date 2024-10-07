import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { PersonalCodeService } from './personal-code.service';
import { ValidatePersonalCodeDto } from './dto/validate-personal-code.dto';
import { GeneratePersonalCodeDto } from './dto/generate-personal-code.dto';

@Controller('personal-code')
export class PersonalCodeController {
  constructor(private readonly personalCodeService: PersonalCodeService) {}

  @Post('validate')
  @HttpCode(200)
  public async validatePersonalCode(
    @Body() validationBody: ValidatePersonalCodeDto,
  ): Promise<{ isValid: boolean }> {
    return this.personalCodeService.validatePersonalCode(
      validationBody.personalCode,
      validationBody.countryCode,
    );
  }

  @Post('generate')
  public async generatePersonalCode(
    @Body() generationBody: GeneratePersonalCodeDto,
  ): Promise<{ personalCode: string }> {
    return this.personalCodeService.generate(
      generationBody.gender,
      generationBody.dateOfBirth,
      generationBody.countryCode,
    );
  }
}
