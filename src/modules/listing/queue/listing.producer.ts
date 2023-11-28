import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { LISTING_QUEUE } from '../../../core/queue/queue.constants';

@Injectable()
export class ListingProducer {
  constructor(@InjectQueue(LISTING_QUEUE) private listingQueue: Queue) {}

  async createListingImage(image: Express.Multer.File) {
    return await this.listingQueue.add(`createListingImage`, image);
  }
}
