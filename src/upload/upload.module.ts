import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PostsModule } from '../posts/post.module';

@Module({
  imports: [
    PostsModule,
  ],
  providers: [UploadService],
})
export class UploadModule {}
