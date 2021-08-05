import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneByMobile(mobile): Promise<User> {
    return await this.findOne({ MobileNumber: mobile, IsDeleted: 0 });
  }

  async checkIsTwoUserIdSame(user1, user2) {
    if (user1.UserId === user2.UserId) return true;
    else return false;
  }
}
