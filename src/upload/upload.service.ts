import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostService } from '../posts/post.service';
import { QueueProducerService } from '../queue/queue-producer.service';

@Injectable()
export class UploadService {

  constructor(
    private readonly postService: PostService,
    private readonly QueueProducerService: QueueProducerService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const upliodList = await this.postService.findPostsToUpload();
    for (let element of upliodList){
      this.QueueProducerService.sendUploadRequest(element.id, element.coverUrl);
    }
  }
}