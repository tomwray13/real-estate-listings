import { Test, TestingModule } from '@nestjs/testing';
import { ListingService } from './listing.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { DatabaseService } from '../../database/database.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { GoogleCloudService } from '../../services/google-cloud/google-cloud.service';

describe(`ListingService`, () => {
  let listingService: ListingService;
  let databaseService: DeepMockProxy<DatabaseService>;
  let googleCloudService: DeepMocked<GoogleCloudService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingService,
        {
          provide: DatabaseService,
          useValue: mockDeep<DatabaseService>(),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    listingService = module.get<ListingService>(ListingService);
    databaseService = module.get(DatabaseService);
    googleCloudService = module.get(GoogleCloudService);
  });

  it('should be defined', () => {
    expect(listingService).toBeDefined();
  });

  describe(`create`, () => {
    it(`should return the created listing`, async () => {
      // Arrange
      const payload = {
        label: `Spacious Apartment in Downtown`,
        addressLine1: `123 Main St`,
        addressLine2: `Apt 4B`,
        addressZipcode: `62704`,
        addressCity: `Springfield`,
        addressState: `UN`,
        price: 150000,
        bathrooms: 2,
        bedrooms: 3,
        squareMeters: 120,
      };
      databaseService.listing.create.mockResolvedValueOnce({
        ...payload,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Act
      const result = await listingService.create({
        data: payload,
        images: [],
      });

      // Assert
      expect(result).toEqual({
        ...payload,
        id: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe(`uploadImage`, () => {
    it(`should return the created listing image`, async () => {
      // Arrange
      const listingId = 1;
      const publicUrl = `https://storage.googleapis.com/listing-images-bucket/random-uid`;
      googleCloudService.uploadFile.mockResolvedValueOnce(publicUrl);
      const mockResponse = {
        id: 1,
        listingId,
        url: publicUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      databaseService.listingImage.create.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await listingService.createListingImage({
        listingId,
        mimeType: `image/jpeg`,
        base64File: `SGVsbG8sIFdvcmxkIQ==`, // random base
      });

      // Assert
      expect(result).toEqual(mockResponse);
    });
  });
});
