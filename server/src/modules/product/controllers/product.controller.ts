import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Response } from 'express'
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';

import { ProductService } from '../services/product.service';


@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}
  @Get()
  async index(@Res() res: Response) {
    const products = await this.productService.getAllProducts();
    return res.json({
      products: plainToClass(Product, products)
    });
  }

  @Get(':id')
  async view(@Param('id') Id: number, @Res() res: Response) {
    const product = await this.productService.getProduct(Id);
    return res.json({
      product: plainToClass(Product, product)
    });
  }
  

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() productDto: CreateProductDto, @Res() res: Response) {
    const product = new Product();
    product.ProductName = productDto.ProductName;
    product.ProductDescription = productDto.ProductDescription;
    product.ProductStatus = productDto.ProductStatus;
    const flag = await this.productService.createProduct(product);
    if(!flag) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Unable to create product`,
      })
    }
    return res.json({
      success: true,
      product
    })
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateProduct(@Param('id') id:number, @Body() productDto: CreateProductDto, @Res() res: Response) {
    
    const exist = await this.productService.getProduct(id);
    if(!exist){
      return res.json({
        success:false,
        message:"not exists"
      }) 
    } 
    const product = new Product();
    product.ProductName = productDto.ProductName;
    product.ProductDescription = productDto.ProductDescription;
    product.ProductStatus = productDto.ProductStatus;
    const flag = await this.productService.updateProduct(id , product);
    if(!flag) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Unable to update product`,
      })
    }
    return res.json({
      success: true,
      product
    })
    // TODO
  }

  @Delete(':id')
  async delete(@Param('id') id:number, @Res() res: Response) {
  
    const flag = await this.productService.remove(id);
    // if(!flag) {
    //  return res.status(HttpStatus.BAD_REQUEST).json({
    //    success: false,
    //     message: `Unable to delete product`,
    //   })
    //}
    return res.json({
      success: true,
      })
  }
//function id(id: any, product: Product) {
  //throw new Error('Function not implemented.');
}