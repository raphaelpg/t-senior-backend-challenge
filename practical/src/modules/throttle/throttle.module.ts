import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { config } from '../../config/config';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: config.throttle.ttl,
      limit: config.throttle.limit,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }    
  ],
})
export class ThrottleModule {}
