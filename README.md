## Description

A post manager.

## Instructionn

1. GET /posts can see all posts list with details.
2. POST /post to send a image url.
```json
"coverUrl": "yourUrl"
```
3. if succeed your image will upload to imgur automatically(you will need a imgur client_id writen in .env file under root directory to make this work).



