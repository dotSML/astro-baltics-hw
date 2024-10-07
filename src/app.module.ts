import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalCodeService } from './domain/personal-code/personal-code.service';
import { PersonalCodeController } from './domain/personal-code/personal-code.controller';
import { PersonalCodeModule } from './domain/personal-code/personal-code.module';
import { DatabaseModule } from './core/database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [PersonalCodeModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
