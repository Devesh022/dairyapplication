import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Ptypes } from '../entities/ptypes.entity';
import { PtypesRepository } from '../repositories/ptypes.repository';

@Injectable()
export class PtypesService {
  constructor(
    @InjectRepository(PtypesRepository)
    private readonly ptypesRepository: PtypesRepository,
    private connection: Connection,
  ) { }

  async getAllPtypes(): Promise<Ptypes[]> {
    return await this.ptypesRepository.find({
      where: {
        IsDeleted: 0
      }
    });
  }
  async getPtypes(_id: number): Promise<Ptypes> {
    return await this.ptypesRepository.findOne({
      where: { Id: _id, IsDeleted: false },
    });
  }
  async createPtypes(ptypes: Ptypes): Promise<boolean> {
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.ptypesRepository.save(ptypes);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      flag = false;
    } finally {
      await queryRunner.release();
    }
    return flag;
  }
  async updatePtypes(id: number, ptypes: Ptypes){
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.ptypesRepository.update(id , ptypes)
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      flag = false;
    } finally {
      await queryRunner.release();
    }
    return flag;
  }
  async softDeletePtypes(id)
  {
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.ptypesRepository.delete(id)
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      flag = false;
    } finally {
      await queryRunner.release();
    }
    return flag;
  }

  async remove(id: number): Promise<void> {
    await this.ptypesRepository.delete(id);
  }
  /*async Delete(id: number){
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.ptypesRepository.update(id, {
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
*/
}
