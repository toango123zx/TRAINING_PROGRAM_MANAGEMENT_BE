import { Module } from '@nestjs/common';

import { HeathCheckModule } from './modules/heathCheck/heathcCheck.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [HeathCheckModule, DatabaseModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
