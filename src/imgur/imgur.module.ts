import { Module } from '@nestjs/common';
import { ImgurService } from './imgur.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [ImgurService],
    exports: [ImgurService],
})
export class ImgurModule {}