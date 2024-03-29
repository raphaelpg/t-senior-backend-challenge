import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './auth-header-api-key.strategy';

@Module({
  imports: [PassportModule],
  providers: [HeaderApiKeyStrategy],
})
export class AuthModule {}