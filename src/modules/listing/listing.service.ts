import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { DatabaseService } from '../../database/database.service';
import { ListingProducer } from './queue/listing.producer';

@Injectable()
export class ListingService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly listingQueue: ListingProducer,
  ) {}

  async create({
    data,
    images,
  }: {
    data: CreateListingDto;
    images: Express.Multer.File[];
  }) {
    const listing = await this.databaseService.listing.create({
      data,
    });
    for (const image of images) {
      // send image to queue
      await this.listingQueue.createListingImage(image);
    }
    return listing;
  }
}
