import { Module } from '@nestjs/common';
import { FileService } from './file/file.service';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class UtilitiesModule {}
