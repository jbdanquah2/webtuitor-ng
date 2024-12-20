import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function imageUploadInterceptor(directory: string) {
  return FileInterceptor('file', {
    storage: diskStorage({
      destination: directory,
      filename: (req, file, cb) => {

        console.log('!!###req.user', req.user);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtName = extname(file.originalname);
        cb(null, `${uniqueSuffix}${fileExtName}`);
      },
    }),
  });
}
