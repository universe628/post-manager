import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { PostsModule } from '../posts/post.module';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [
    PostsModule,
    QueueModule,
  ],
  providers: [UploadService],
})
export class UploadModule {}
