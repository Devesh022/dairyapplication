import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    private connection: Connection,
  ) { }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        IsDeleted: 0
      }
    });
  }
 
  

  async getProduct(_Id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: { Id: _Id, IsDeleted: false },
    });
  }
  async createProduct(product: Product): Promise<boolean> {
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.productRepository.save(product);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      flag = false;
    } finally {
      await queryRunner.release();
    }
    return flag;
  }
  async updateProduct(Id: number, product: Product){
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.productRepository.update(Id , product)
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      flag = false;
    } finally {
      await queryRunner.release();
    }
    return flag;
  }

  async remove(Id: number): Promise<void> {
    
    await this.productRepository.delete(Id);
  }
  async deleteProduct(id)
  {
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.productRepository.delete(id)
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      flag = false;
    } finally {
      await queryRunner.release();
    }
    return flag;
  }

  async softDeleteProduct(id: number){
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.productRepository.update(id, {
        IsDeleted:1
      })
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      flag = false;
    } finally {
      await queryRunner.release();
    }
    return flag;
  }

}
