import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {

  @ApiProperty({example: 'milk'})
  @IsNotEmpty()
  @MaxLength(64, {
    message: ' productName must be less than 64 characters.'
  })
  ProductName: string;

  
  @IsOptional()
  @IsNumberString()
  ProductStatus: string;

  @ApiProperty({ example: 'product discription' })
  @IsNotEmpty()
  @IsString()
  @MinLength(15, {
    message: 'product discription must be greater than 15 words .',
  })
  ProductDescription: string;
}

