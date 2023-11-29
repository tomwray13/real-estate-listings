import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UploadListingImageDto } from '../dto/upload-listing-image.dto';
import { LISTING_QUEUE } from '../../../core/queue/queue.constants';
import { BaseConsumer } from '../../../core/queue/base.conumer';
import { LoggerService } from '../../../core/logger/logger.service';
import { FileService } from '../../../utilities/file/file.service';
import { ConfigService } from '@nestjs/config';
import { GoogleCloudService } from '../../../services/google-cloud/google-cloud.service';

@Processor(LISTING_QUEUE)
export class ListingConsumer extends BaseConsumer {
  constructor(
    logger: LoggerService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
    private readonly googleCloudService: GoogleCloudService,
  ) {
    super(logger);
  }

  @Process(`createListingImage`)
  async createListingImage(job: Job<UploadListingImageDto>) {
    const mimeType = job.data.mimeType;
    const buffer = this.fileService.base64ToBuffer(job.data.base64File);
    const bucketName = this.configService.getOrThrow<string>(
      `gcp.buckets.listingImages`,
    );
    const publicUrl = await this.googleCloudService.uploadFile(
      bucketName,
      buffer,
      mimeType,
    );
    console.log(`Public image file`, publicUrl);
    // TODO: store respective Google Cloud Storage URL in database
  }
}
