import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './requests.entity';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [RequestsService],
  exports: [RequestsService],
  controllers: [RequestsController],
})
export class RequestsModule {}
