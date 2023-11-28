import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  bufferToBase64(buffer: Buffer): string {
    return buffer.toString(`base64`);
  }

  base64ToBuffer(base64String: string): Buffer {
    return Buffer.from(base64String, `base64`);
  }
}
