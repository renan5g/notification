import { SendNotification } from '@application/use-cases';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';

import { KafkaConsumerService } from './kafka/kafka-consumer.service';

import * as KafkaControllers from './kafka/controllers';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [...Object.values(KafkaControllers)],
})
export class MessagingModule {}
