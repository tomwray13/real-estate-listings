import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UploadListingImageDto } from '../dto/upload-listing-image.dto';
import { LISTING_QUEUE } from '../../../core/queue/queue.constants';
import { BaseConsumer } from '../../../core/queue/base.conumer';
import { LoggerService } from '../../../core/logger/logger.service';
import { ListingService } from '../listing.service';

@Processor(LISTING_QUEUE)
export class ListingConsumer extends BaseConsumer {
  constructor(
    logger: LoggerService,
    private readonly listingService: ListingService,
  ) {
    super(logger);
  }

  @Process(`createListingImage`)
  async createListingImage(job: Job<UploadListingImageDto>) {
    return await this.listingService.createListingImage(job.data);
  }
}
