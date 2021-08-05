import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { BrandController } from './controllers/brand.controller';
import { BrandRepository } from './repositories/brand.repository';
import { BrandService } from './services/brand.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      BrandRepository
    ])
  ],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
