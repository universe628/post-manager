import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueProducerService } from './queue-producer.service';
import { QueueConsumerService } from './queue-consumer.service';
import { PostsModule } from '../posts/post.module';


@Module({
    imports: [
        BullModule.registerQueue({
            name: 'upload-queue',
          }),
          PostsModule,
    ],
    providers: [
        QueueProducerService,
        QueueConsumerService,
    ],
    exports: [
        QueueProducerService,
        QueueConsumerService,
    ]
  })
  export class QueueModule {}
  
