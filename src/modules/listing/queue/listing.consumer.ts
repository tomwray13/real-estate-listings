import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UploadListingImageDto } from '../dto/upload-listing-image.dto';
import { LISTING_QUEUE } from '../../../core/queue/queue.constants';
import { BaseConsumer } from '../../../core/queue/base.conumer';
import { LoggerService } from '../../../core/logger/logger.service';
import { FileService } from '../../../utilities/file/file.service';

@Processor(LISTING_QUEUE)
export class ListingConsumer extends BaseConsumer {
  constructor(
    logger: LoggerService,
    private readonly fileService: FileService,
  ) {
    super(logger);
  }

  @Process(`createListingImage`)
  async createListingImage(job: Job<UploadListingImageDto>) {
    const buffer = this.fileService.base64ToBuffer(job.data.base64File);
    // TODO: upload file to Google Cloud Storage
    // TODO: store respective Google Cloud Storage URL in database
  }
}
