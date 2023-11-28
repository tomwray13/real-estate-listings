import { BadRequestException } from '@nestjs/common';
import { MaxFileCountValidationPipe } from './max-file-count-validation.pipe';

describe(`MaxFileCountPipe`, () => {
  let maxFileCountPipe: MaxFileCountValidationPipe;

  beforeEach(async () => {
    maxFileCountPipe = new MaxFileCountValidationPipe(2);
  });

  it(`should throw an exception if number of files is greater than the max allowed`, () => {
    // Arrange
    const file = {} as Express.Multer.File;

    // Act
    const result = () => maxFileCountPipe.transform([file, file, file]);

    // Assert
    expect(result).toThrow(BadRequestException);
  });

  it(`should return files if count less than the max allowed`, () => {
    // Arrange
    const file = {} as Express.Multer.File;
    const payload = [file];

    // Act
    const result = maxFileCountPipe.transform(payload);

    // Assert
    expect(result).toEqual(payload);
  });

  it(`should return files if count equal to max allowed`, () => {
    // Arrange
    const file = {} as Express.Multer.File;
    const payload = [file, file];

    // Act
    const result = maxFileCountPipe.transform(payload);

    // Assert
    expect(result).toEqual(payload);
  });
});
