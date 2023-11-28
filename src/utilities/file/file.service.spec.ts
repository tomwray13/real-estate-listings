import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`bufferToBase64`, () => {
    it(`should convert a buffer to a base64 string`, () => {
      const buffer = Buffer.from(`Hello, World!`);
      const base64 = `SGVsbG8sIFdvcmxkIQ==`; // Base64 encoded string of 'Hello, World!'

      const result = service.bufferToBase64(buffer);
      expect(result).toBe(base64);
    });
  });

  describe(`base64ToBuffer`, () => {
    it(`should convert a base64 string to a buffer`, () => {
      const base64 = `SGVsbG8sIFdvcmxkIQ==`; // Base64 encoded string of 'Hello, World!'
      const buffer = Buffer.from(`Hello, World!`);

      const result = service.base64ToBuffer(base64);
      expect(result).toEqual(buffer);
    });
  });
});
