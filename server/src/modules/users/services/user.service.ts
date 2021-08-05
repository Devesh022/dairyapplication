import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

import { User } from '../entities/user.entity';
import { UserStatus } from '../enums/user-status';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private connection: Connection,
  ) {}

  public async getAuthenticatedUser(
    mobileNo: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        MobileNumber: mobileNo,
        IsDeleted: false,
        Status: UserStatus.ACTIVE,
      },
      // relations: ['Role', 'Organisation', 'Image'],
    });

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.Password)) {
      return this.plainUser(user);
    }
    throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
  }

  public async getById(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        Id: userId,
      },
    });

    if (!user) {
      throw new HttpException('Invalid User', HttpStatus.NOT_FOUND);
    }

    return this.plainUser(user);
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        IsDeleted: false
      }
    });
  }

  async getUser(_id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { Id: _id, IsDeleted: false },
    });
  }

  public async createUser(user: User): Promise<boolean> {
    let flag = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.userRepository.save(user);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      flag = false;
    } finally {
      await queryRunner.release();
    }
    return flag;
  }

  private plainUser(user) {
    return plainToClass(User, user);
  }
}
