import { IsNotEmpty, IsNumberString, IsOptional, MaxLength } from "class-validator";


export class CreateBrandDto {

  @IsNotEmpty()
  @MaxLength(64, {
    message: 'Title must be less than 64 characters.'
  })
  Title: string;

  @IsOptional()
  @MaxLength(255, {
    message: 'Description must be less than 255 characters.'
  })
  Description: string;

  @IsOptional()
  @IsNumberString()
  Status: number;
}