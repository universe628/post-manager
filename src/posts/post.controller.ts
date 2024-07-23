import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dtos/post.dtos';

@Controller('posts')
export class PostsController {

  constructor(
    private readonly postService: PostService,
  ){}

  @Get()
  async getPostsList() {
    return await this.postService.getAllPost();
  }

  @Post()
  async createPost(@Body() body: CreatePostDto) {
    await this.postService.createPost(body.coverUrl)
  }
}
