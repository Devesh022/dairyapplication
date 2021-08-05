import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  Mobile: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  Password: string;
}
