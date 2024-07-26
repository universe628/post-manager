import { Injectable } from '@nestjs/common';
import { PostService } from '../posts/post.service';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';

@Injectable()
@Processor('upload-queue')
export class QueueConsumerService  {
    constructor(
        private readonly postService: PostService,
      ) {}
    @Process('upload-request')
    async handleNewRequest(job: Job) {
        try{
            //console.log('queue processing');
            await this.postService.processUploadQueue(job.data.id, job.data.url);
        } catch (error) {
            throw error;
        }
    }

}