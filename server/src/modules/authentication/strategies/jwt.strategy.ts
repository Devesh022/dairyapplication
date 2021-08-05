import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { ConfigService } from './../../config/config.service';
import { UserService } from './../../users/services/user.service';

import { TokenPayload } from './../models/token-payload';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('ConfigService')
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  public async validate(payload: TokenPayload, done: VerifiedCallback) {
    const user = await this.userService.getById(payload.userId);

    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }
    return done(null, user, payload);
  }
}
