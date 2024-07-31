import { Injectable } from '@nestjs/common';
import { PostService } from '../posts/post.service';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Injectable()
@Processor('upload-queue')
export class QueueConsumerService extends WorkerHost {
    constructor(
        private readonly postService: PostService,
      ) { super() }

    async process(job: Job): Promise<any> {
        try{
            //console.log('queue processing');
            await this.postService.processUploadQueue(job.data.id, job.data.url);
        } catch (error) {
            throw error;
        }
    }
}