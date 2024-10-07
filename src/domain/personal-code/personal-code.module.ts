import { Module } from '@nestjs/common';
import { PersonalCodeFactory } from './personal-code.factory';
import { EstonianPersonalCodeStrategy } from './strategies/estonian-personal-code.strategy';
import { PersonalCodeController } from './personal-code.controller';
import { PersonalCodeService } from './personal-code.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { PersonalCodeModel } from './personal-code.model';

@Module({
  imports: [SequelizeModule.forFeature([PersonalCodeModel])],
  providers: [
    PersonalCodeService,
    PersonalCodeFactory,
    EstonianPersonalCodeStrategy,
  ],
  controllers: [PersonalCodeController],
  exports: [PersonalCodeFactory, PersonalCodeService],
})
export class PersonalCodeModule {}
