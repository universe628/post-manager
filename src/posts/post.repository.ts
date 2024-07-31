import { readJson, writeJson } from 'fs-extra'
import * as fs from 'fs/promises';
import { PostJsonDto, PostStatus } from '../dtos/post.dtos'

export class PostRepository{

    async readFromFile(): Promise<PostJsonDto[]> {
         try {
            await fs.stat('posts.json')
            const fileData = await fs.readFile('posts.json', 'utf8');
            return JSON.parse(fileData) as PostJsonDto[];
        } catch {
          return [];
        }
      }

      async writeToFile(data: any[]) {
        await fs.writeFile('posts.json', JSON.stringify(data, null, 2), 'utf8');
      }


    async findAll(){
        return await this.readFromFile();
    }

    async createNewPost(id: number, url: string){
        const data = await this.readFromFile();
        data.push({
            id:id,
            coverUrl: url,
            imgurCoverUrl: '',
            status: PostStatus.IDLE
        });
        await this.writeToFile(data);
    }

    async updatePostStatusToUploadingById(id: number){
        const data = await this.readFromFile();
        for (let element of data){
            if (element.id == id){
                element.status = PostStatus.UPLOADING;
                break;
            }
        }
        await this.writeToFile(data);
    }

    async updatePostImgurUrlAndPostStatus(id: number, imgurUrl: string){
        const data = await this.readFromFile();
        for (let element of data){
            if (element.id == id){
                element.status = PostStatus.DONE;
                element.imgurCoverUrl = imgurUrl;
                break;
            }
        }
        await this.writeToFile(data);
    }

    async updatePostStatusToErrorById(id: number){
        const data = await this.readFromFile();
        for (let element of data){
            if (element.id == id){
                element.status = PostStatus.ERROR;
                break;
            }
        }
        await this.writeToFile(data);
    }
}