import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { User } from './../../users/entities/user.entity';
import { LoggedUser } from '../decorators/authentication.decorator';
import { LoginDto } from '../dto/login.dto';
import { AuthenticationService } from '../services/authentication.service';

@Controller('authentication')
export class AuthenticationController {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login web service',
  })
  public async login(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.authenticationService.login(body);
    const payload = {
      userId: user.Id,
      mobileNo: user.MobileNumber,
      emailAddress: user.EmailAddress
    };
    const token = await this.authenticationService.signPayload(payload);
    return res.json({ user, token });
  }
  
  // @UseGuards(AuthGuard('jwt'))
  @Post('check')
  @ApiResponse({
    status: 200,
    description: 'Web service for checking the working of authenticaiton',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  public async checkToken(@LoggedUser() user, @Res() res: Response) {
    return res.json({
      user: plainToClass(User, user)
    });
  }
}
