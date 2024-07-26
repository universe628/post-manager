import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bullmq';
import { QueueJob } from '../dtos/post.dtos'

@Injectable()
export class QueueProducerService {

  constructor(
    @InjectQueue('upload-queue') private readonly upload_queue: Queue<QueueJob>
  ) {}

  async sendUploadRequest(id: number, url: string) {
    const job = await this.upload_queue.add('upload-request', {
      id: id,
      url: url
    });
    //console.log('queue added');
  }
}