import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ListingService {
  constructor(private readonly databaseService: DatabaseService) {}

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
      // do something with image
      console.log(`image`, image);
    }
    return listing;
  }
}
