import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalCodeService } from './domain/personal-code/personal-code.service';
import { PersonalCodeController } from './domain/personal-code/personal-code.controller';
import { PersonalCodeModule } from './domain/personal-code/personal-code.module';

@Module({
  imports: [PersonalCodeModule],
  controllers: [AppController, PersonalCodeController],
  providers: [AppService, PersonalCodeService],
})
export class AppModule {}
