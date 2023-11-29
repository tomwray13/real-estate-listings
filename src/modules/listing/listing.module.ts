import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { BullModule } from '@nestjs/bull';
import { ListingProducer } from './queue/listing.producer';
import { ListingConsumer } from './queue/listing.consumer';
import { LISTING_QUEUE } from '../../core/queue/queue.constants';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { UtilitiesModule } from '../../utilities/utilities.module';
import { GoogleCloudModule } from '../../services/google-cloud/google-cloud.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: LISTING_QUEUE }),
    BullBoardModule.forFeature({
      name: LISTING_QUEUE,
      adapter: BullAdapter,
    }),
    UtilitiesModule,
    GoogleCloudModule,
  ],
  controllers: [ListingController],
  providers: [ListingService, ListingProducer, ListingConsumer],
})
export class ListingModule {}
