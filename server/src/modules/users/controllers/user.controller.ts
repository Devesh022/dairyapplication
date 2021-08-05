import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Response } from 'express'
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
  @Get()
  async index(@Res() res: Response) {
    const users = await this.userService.getAllUsers();
    return res.json({
      users: plainToClass(User, users)
    });
  }

  @Get(':id')
  async view(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.getUser(id);
    return res.json({
      user: plainToClass(User, user)
    });
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const user = new User();
    user.MobileNumber = userDto.MobileNumber;
    user.AlternateMobileNumber = userDto.AlternateMobileNumber;
    user.Password = userDto.Password;
    user.EmailAddress = userDto.EmailAddress;
    user.Name = userDto.Name;
    const flag = await this.userService.createUser(user);
    if(!flag) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Unable to create user`,
      })
    }
    return res.json({
      success: true,
      user
    })
  }

  @Put(':id')
  update() {
    // TODO
  }

  @Delete(':id')
  delete() {
    // TODO 
    // Instead of deleting the user from database
    // We will update the user's IsDeleted property as true
    // This is call as soft delete
  }

  @Delete(':id')
  hardDelete() {
    // TODO 
    // To delete the record from table 
    // we will delete the record from database using delete query
    // This is call as hard delete
  }
}
