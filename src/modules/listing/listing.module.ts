import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { BullModule } from '@nestjs/bull';
import { ListingProducer } from './queue/listing.producer';
import { ListingConsumer } from './queue/listing.consumer';
import { LISTING_QUEUE } from '../../core/queue/queue.constants';

@Module({
  imports: [BullModule.registerQueue({ name: LISTING_QUEUE })], // <-- use constant
  controllers: [ListingController],
  providers: [ListingService, ListingProducer, ListingConsumer],
})
export class ListingModule {}
