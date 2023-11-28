import { OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { LoggerService } from '../logger/logger.service';

export abstract class BaseConsumer {
  constructor(protected readonly logger: LoggerService) {}
  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
      `Queue`,
      job.data,
    );
  }
}
