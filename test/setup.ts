import { HttpServer, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { CacheService } from '../src/core/cache/cache.service';
import { DatabaseService } from '../src/database/database.service';
import helmet from 'helmet';
import { GoogleCloudService } from '../src/services/google-cloud/google-cloud.service';
import { createMock } from '@golevelup/ts-jest';
import { Queue } from 'bull';
import { LISTING_QUEUE } from '../src/core/queue/queue.constants';

let app: INestApplication;
let server: HttpServer;
let moduleFixture: TestingModule;
let cache: CacheService;
let database: DatabaseService;
let listingQueue: Queue;

beforeAll(async () => {
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      {
        provide: GoogleCloudService,
        useValue: createMock<GoogleCloudService>(),
      },
    ],
  }).compile();

  // Apply consistent set up to main.ts
  app = moduleFixture.createNestApplication();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Get instances of services
  cache = moduleFixture.get<CacheService>(CacheService);
  database = moduleFixture.get<DatabaseService>(DatabaseService);
  listingQueue = moduleFixture.get<Queue>(`BullQueue_${LISTING_QUEUE}`); // <-- get the queue instance using the LISTING_QUEUE constant

  await app.init();
  server = app.getHttpServer();
});

afterEach(async () => {
  await database.resetDb();
  await cache.reset();
});

afterAll(async () => {
  await app.close();
});

export { server, app, listingQueue };
