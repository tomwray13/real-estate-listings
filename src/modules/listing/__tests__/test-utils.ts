import { readFileSync } from 'fs';
import { join } from 'path';

export const generateCreateListingPayload = () => ({
  label: `Test Listing`,
  addressLine1: `123 Test Street`,
  addressLine2: `Apt 1`,
  addressCity: `Test City`,
  addressZipcode: `12345`,
  addressState: `Test State`,
  price: 1000,
  bathrooms: 1,
  bedrooms: 1,
  squareMeters: 1000,
});

export const generateListingImages = () => {
  // IMAGE 1
  const image1Path = join(__dirname, `./images/image-1.png`);
  const image1Buffer = readFileSync(image1Path);
  const image1 = {
    mimetype: `image/png`,
    buffer: image1Buffer,
  } as Express.Multer.File;
  // IMAGE 2
  const image2Path = join(__dirname, `./images/image-2.png`);
  const image2Buffer = readFileSync(image2Path);
  const image2 = {
    mimetype: `image/png`,
    buffer: image2Buffer,
  } as Express.Multer.File;
  // IMAGE 3
  const image3Path = join(__dirname, `./images/image-3.png`);
  const image3Buffer = readFileSync(image3Path);
  const image3 = {
    mimetype: `image/png`,
    buffer: image3Buffer,
  } as Express.Multer.File;
  return [image1, image2, image3];
};
