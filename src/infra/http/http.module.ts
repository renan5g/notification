import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';

import * as UseCases from '@application/use-cases';
import * as Controllers from './controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(UseCases)],
})
export class HttpModule {}
