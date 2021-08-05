import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { PtypesController } from './controllers/ptypes.controller';
import { PtypesRepository } from './repositories/ptypes.repository';
import { PtypesService } from './services/ptypes.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PtypesRepository
    ])
  ],
  controllers: [PtypesController],
  providers: [PtypesService]
})
export class PtypesModule {}
