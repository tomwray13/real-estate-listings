import { Module } from '@nestjs/common';
import { FileService } from './file/file.service';
import { UidService } from './uid/uid.service';

@Module({
  providers: [FileService, UidService],
  exports: [FileService, UidService],
})
export class UtilitiesModule {}
