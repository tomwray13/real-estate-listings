import { Listing } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UploadListingImageDto {
  @IsString()
  @IsNotEmpty()
  base64File: string;

  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @IsInt()
  listingId: Listing[`id`];
}
