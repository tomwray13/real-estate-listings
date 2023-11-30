import { app, listingQueue } from '../../../test/setup';
import { DatabaseService } from '../../database/database.service';
import {
  generateCreateListingPayload,
  generateListingImages,
} from './__tests__/test-utils';
import { ListingService } from './listing.service';

describe(`ListingService Integration Tests`, () => {
  let listingService: ListingService;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    listingService = app.get(ListingService);
    databaseService = app.get(DatabaseService);
  });

  describe(`create`, () => {
    it(`should create a listing`, async () => {
      const payload = generateCreateListingPayload();
      const listing = await listingService.create({
        data: payload,
        images: [],
      });
      const persistedListing = await databaseService.listing.findUnique({
        where: {
          id: listing.id,
        },
      });
      expect(listing).toEqual(persistedListing);
    });

    it(`should create a listing with images`, async () => {
      const payload = generateCreateListingPayload();
      const images = generateListingImages();
      const listing = await listingService.create({
        data: payload,
        images,
      });
      // wait for jobs to finish processing
      let inProcessJobs = await listingQueue.getJobs([`active`]);
      while (inProcessJobs.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        inProcessJobs = await listingQueue.getJobs([`active`]);
      }

      const persistedListing = await databaseService.listing.findUnique({
        where: {
          id: listing.id,
        },
      });
      const persistedImages = await databaseService.listingImage.findMany({
        where: {
          listingId: listing.id,
        },
      });
      expect(listing).toEqual(persistedListing);
      expect(persistedImages.length).toBe(3);
    });
  });
});
