import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { CreateListingInput } from '../listing.types';
import { Type } from 'class-transformer';

export class CreateListingDto implements CreateListingInput {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  addressLine2: string;

  @IsString()
  @IsNotEmpty()
  addressCity: string;

  @IsString()
  @IsNotEmpty()
  addressZipcode: string;

  @IsString()
  @IsNotEmpty()
  addressState: string;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  bathrooms: number;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  bedrooms: number;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  squareMeters: number;
}
