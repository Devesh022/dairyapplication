import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express'
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';

import { BrandService } from '../services/brand.service';

@Controller('brands')
export class BrandController {
  constructor(
    private readonly brandService: BrandService
  ) {}
  
  @Get()
  async index(@Res() res: Response) {
    const brands = await this.brandService.getAllBrands();
    return res.json({
      brands: brands
    });
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The brand has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() brandDto: CreateBrandDto, @Res() res: Response) {
    const brand = new Brand();
    brand.Title = brandDto.Title;
    brand.Description = brandDto.Description;
    brand.Status = brandDto.Status;
    const flag = await this.brandService.createBrand(brand);
    if(!flag) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Unable to create brand`,
      })
    }
    return res.json({
      success: true,
      brand
    })
  }
}
