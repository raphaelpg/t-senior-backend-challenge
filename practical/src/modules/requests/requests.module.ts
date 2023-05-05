import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './requests.entity';
import { RequestsService } from './requests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}
