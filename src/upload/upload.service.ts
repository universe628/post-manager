import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostService } from '../posts/post.service';

@Injectable()
export class UploadService {

  constructor(
    private readonly postService: PostService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    await this.postService.processUploadQueue();
  }
  }