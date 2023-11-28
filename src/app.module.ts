import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ListingModule } from './modules/listing/listing.module';
import { UtilitiesModule } from './utilities/utilities.module';

@Module({
  imports: [CoreModule, ListingModule, UtilitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
