import { Injectable } from '@nestjs/common';

@Injectable()
export class JsonService {
    getJsonLength(jsonData:any[]):number{
        return jsonData.length
    }
}