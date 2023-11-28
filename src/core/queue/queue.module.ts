import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('redis.username');
        const password = configService.get('redis.password');
        return {
          redis: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
            ...(username && { username }),
            ...(password && { password }),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class QueueModule {}
