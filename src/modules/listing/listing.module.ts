import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';

@Module({
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
