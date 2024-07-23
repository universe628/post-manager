import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadModule } from './upload/upload.module';
import { PostsModule } from './posts/post.module';
import { ImgurModule } from './imgur/imgur.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
      ScheduleModule.forRoot(),
      PostsModule,
      UploadModule,
      ImgurModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    ],
  })
  export class AppModule {}