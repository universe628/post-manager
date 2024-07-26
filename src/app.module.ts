import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadModule } from './upload/upload.module';
import { PostsModule } from './posts/post.module';
import { ImgurModule } from './imgur/imgur.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';


@Module({
    imports: [
      ScheduleModule.forRoot(),
      PostsModule,
      UploadModule,
      ImgurModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      BullModule.forRoot({
        connection: {
          host: 'localhost',
          port: 6379,
        },
      }),
    ],
  })
  export class AppModule {}