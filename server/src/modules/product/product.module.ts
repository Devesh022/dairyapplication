import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      ProductRepository
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
