import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString, IsEmail, MaxLength, MinLength, IsEmpty, IsOptional } from "class-validator";

import {UniqueMobile} from './../decorators/unique-mobile.decorator'

export class CreateUserDto {

  @ApiProperty({example: 'John Doe'})
  @IsNotEmpty()
  @MaxLength(64, {
    message: 'Name must be less than 64 characters.'
  })
  Name: string;

  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(10, {
    message: 'Mobile no must be of 10 digits.',
  })
  @MaxLength(10, {
    message: 'Mobile no must be of 10 digits',
  })
  @UniqueMobile({
    message: 'Mobile no already exist.',
  })
  MobileNumber: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password must be atleast 6 characters.',
  })
  Password: string;

  @ApiProperty({ example: '1234567890' })
  @IsOptional()
  @IsNumberString()
  @MinLength(10, {
    message: 'Alternate Mobile no must be of 10 digits.',
  })
  @MaxLength(10, {
    message: 'Alternate Mobile no must be of 10 digits',
  })
  @UniqueMobile({
    message: 'Alternate Mobile no already exist.',
  })
  AlternateMobileNumber: string;

  @ApiProperty({example: 'test@example.com'})
  @IsOptional()
  @IsEmail()
  EmailAddress: string;
}