import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString, IsEmail, MaxLength, MinLength, IsEmpty, IsOptional } from "class-validator";

export class CreatePtypesDto {

 // @ApiProperty({example: 'milk'})
 // @IsNotEmpty()
 // @MaxLength(64, {
 //   message: ' productName must be less than 64 characters.'
 // })
//  Product_type_Status: number;

 // @ApiProperty({ example: 'product discription' })
 // @IsNotEmpty()
 // @IsString()
 // @MinLength(100, {
 //   message: 'product discription must be greater than 15 words .',
 // })
 // Product_type_Description: string;

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
