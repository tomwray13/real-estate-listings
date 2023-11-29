import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UidService } from '../../utilities/uid/uid.service';

@Injectable()
export class GoogleCloudService {
  private storage: Storage;

  constructor(
    private readonly configService: ConfigService,
    private readonly uidService: UidService,
  ) {
    this.storage = new Storage({
      projectId: this.configService.getOrThrow(`gcp.projectId`),
      credentials: {
        client_email: this.configService.getOrThrow(`gcp.clientEmail`),
        private_key: this.configService.getOrThrow(`gcp.privateKey`),
      },
    });
  }

  async uploadFile(
    bucketName: string,
    fileBuffer: Buffer,
    fileMimeType: string,
  ) {
    const bucket = this.storage.bucket(bucketName);
    const fileName = this.uidService.generate();
    const file = bucket.file(fileName);
    await file.save(fileBuffer, {
      metadata: {
        contentType: fileMimeType,
      },
      gzip: true,
    });
    await file.makePublic();
    return file.publicUrl();
  }
}
