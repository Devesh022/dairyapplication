import { EntityRepository, Repository } from 'typeorm';
import { Ptypes } from '../entities/ptypes.entity';

@EntityRepository(Ptypes)
export class PtypesRepository extends Repository<Ptypes> {
  
}
