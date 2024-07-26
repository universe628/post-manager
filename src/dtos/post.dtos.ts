import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUrl, IsString } from 'class-validator';

export class CreatePostDto {
  @IsUrl()
  @IsNotEmpty()
  @IsString()
  @Expose()
  coverUrl: string;
}

export class PostJsonDto {
  id: number;
  coverUrl: string;
  imgurCoverUrl: string;
  status: PostStatus;
}

export enum PostStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  DONE = 'done',
  ERROR = 'error',
}

export interface QueueJob{
  id: number;
  url: string;
}