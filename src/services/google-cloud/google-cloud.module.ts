import { Module } from '@nestjs/common';
import { GoogleCloudService } from './google-cloud.service';
import { UtilitiesModule } from '../../utilities/utilities.module';

@Module({
  imports: [UtilitiesModule],
  providers: [GoogleCloudService],
  exports: [GoogleCloudService],
})
export class GoogleCloudModule {}
