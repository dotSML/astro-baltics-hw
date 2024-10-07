import { Module } from '@nestjs/common';
import { PersonalCodeFactory } from './personal-code.factory';
import { EstonianPersonalCodeStrategy } from './strategies/estonian-personal-code.strategy';

@Module({
  providers: [PersonalCodeFactory, EstonianPersonalCodeStrategy],
  exports: [PersonalCodeFactory],
})
export class PersonalCodeModule {}
