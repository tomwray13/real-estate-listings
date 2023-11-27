import { Listing as PrismaListing } from '@prisma/client';

export type CreateListingInput = Omit<
  PrismaListing,
  'id' | 'createdAt' | 'updatedAt'
>;
