import { Controller, Post, Body } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingService.create(createListingDto);
  }
}
