import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostJsonDto, PostStatus } from '../dtos/post.dtos';
import { ImgurService } from '../imgur/imgur.service';

@Injectable()
export class PostService {

  constructor(
    private readonly postRepo: PostRepository,
    private readonly ImgurService: ImgurService,
  ) {
  }

  async getAllPost() {
    return await this.postRepo.findAll();
  }

  async createPost(url: string) {
    const result = await this.postRepo.findAll()
    let id: number;
    if (result.length == null) {
      id = 0
    } 
    else {
      id = result.length + 1
    }
    await this.postRepo.createNewPost(id, url)
  }

  async findPostsToUpload(): Promise<PostJsonDto[]> {
    const posts = await this.getAllPost();
    const postsToUpload: PostJsonDto[] = [];
    
    for (const element of posts) {
      if (element.status === PostStatus.IDLE && element.imgurCoverUrl === '') {
        postsToUpload.push(element);
      }
    }
    
    return postsToUpload;
  }

  async processUploadQueue(id: number, url: string){
    await this.postRepo.updatePostStatusToUploadingById(id);
    try {
      const imgurUrl = await this.ImgurService.uploadImageToImgur(url)
      await this.postRepo.updatePostImgurUrlAndPostStatus(id, imgurUrl)
    } catch (error){
      await this.postRepo.updatePostStatusToErrorById(id)
    } 
  }
}
