import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from './../../config/config.service';
import { User } from './../../users/entities/user.entity';
import { UserService } from './../../users/services/user.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  public async login(loginDto: LoginDto): Promise<User> {
    const { Mobile, Password } = loginDto;
    return await this.userService.getAuthenticatedUser(Mobile, Password);
  }

  public async signPayload(payload) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRE_TIME'),
    });
  }
}
