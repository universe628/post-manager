import { Module } from '@nestjs/common';
import { PostsController } from './post.controller';
import { PostService } from './post.service';
import { ConfigModule } from '@nestjs/config';
import { ImgurModule } from '../imgur/imgur.module';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    ConfigModule,
    ImgurModule,
  ],
  controllers: [PostsController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostsModule {}
