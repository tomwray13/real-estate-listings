import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ListingService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createListingDto: CreateListingDto) {
    return await this.databaseService.listing.create({
      data: createListingDto,
    });
  }
}
