import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      UserRepository
    ])
  ],
  providers: [
    UserService
  ],
  exports: [
    UserService
  ],
  controllers: [UserController]
})
export class UsersModule {}
