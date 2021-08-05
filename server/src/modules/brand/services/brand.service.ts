import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Brand } from '../entities/brand.entity';
import { BrandRepository } from '../repositories/brand.repository';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandRepository)
    private readonly brandRepository: BrandRepository,
    private connection: Connection,
  ) { }

  async getAllBrands(): Promise<Brand[]> {
    return await this.brandRepository.find({
      where: {
        IsDeleted: 0
      }
    });
  }

  async createBrand(brand: Brand): Promise<boolean> {
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.brandRepository.save(brand);
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
