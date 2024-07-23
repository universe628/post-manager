import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImgurService {
    
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    async uploadImageToImgur(imageUrl: string): Promise<string> {
        const imgurAnonymousUploadConfig = {
            headers:{
                'Authorization': 'Client-ID ' + this.configService.get<string>('IMGUR_CLIENT_ID')
            },
        }
        const imgurAnonymousUploadData = {
            'image': imageUrl,
            'type': 'url'
        }

        try{
            const res = await lastValueFrom(
                this.httpService.post('https://api.imgur.com/3/image', imgurAnonymousUploadData, imgurAnonymousUploadConfig).pipe(
                    map((response) => response.data)
                )
            );
            return res.data.link;
        } catch (error){
            //console.log(error)
            throw new Error('Failed to upload image to Imgur');
        }
      }
}