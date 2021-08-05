import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Response } from 'express'
import { CreatePtypesDto } from '../dto/create-ptypes.dto';
import { Ptypes } from '../entities/ptypes.entity';

import { PtypesService } from '../services/ptypes.service';

@Controller('ptypes')
export class PtypesController {
  constructor(
    private readonly ptypesService: PtypesService
  ) {}
  @Get()
  async index(@Res() res: Response) {
    const ptypes = await this.ptypesService.getAllPtypes();
    return res.json({
      ptypes: plainToClass(Ptypes, ptypes)
    });
  }

  @Get(':id')
  async view(@Param('id') id: number, @Res() res: Response) {
    const ptypes = await this.ptypesService.getPtypes(id);
    return res.json({
      ptypes: plainToClass(Ptypes, ptypes)
    });
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The ptypes has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() ptypesDto: CreatePtypesDto, @Res() res: Response) {
    const ptypes = new Ptypes();
    ptypes.Title = ptypesDto.Title;
    ptypes.Description = ptypesDto.Description;
    ptypes.Status = ptypesDto.Status;
    const flag = await this.ptypesService.createPtypes(ptypes);
    if(!flag) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Unable to create ptypes`,
      })
    }
    return res.json({
      success: true,
      ptypes
    })
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'The ptypes has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updatePtypes(@Param('id') id:number, @Body() ptypesDto: CreatePtypesDto, @Res() res: Response) {
    const exist = await this.ptypesService.getPtypes(id);
    if(!exist){
      return res.json({
        success:false,
        message:"not exists"
      }) 
    }
    const ptypes = new Ptypes();
    ptypes.Title = ptypesDto.Title;
    ptypes.Description = ptypesDto.Description;
    ptypes.Status = ptypesDto.Status;
    const flag = await this.ptypesService.updatePtypes(id , ptypes);
    if(!flag) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Unable to update ptypes`,
      })
    }
    return res.json({
      success: true,
      ptypes
    })
    // TODO
  }

  @Delete(':id')
  async delete(@Param('id') id:number, @Res() res: Response) {
    // TODO 
    // Instead of deleting the product from database
    // We will update the product's IsDeleted property as true
    // This is call as soft delete
    const flag = await this.ptypesService.softDeletePtypes(id);
    if(!flag) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Unable to delete ptypes`,
      })
    }
    return res.json({
      success: true,
      
    })
  }

  @Delete('hard-delete/:id')
  async hardDelete(@Param('id') id:number, @Res() res: Response) {
    // TODO 
    // To delete the record from table 
    // we will delete the record from database using delete query
    // This is call as hard delete
    const flag = await this.ptypesService.remove(id);
    /*if(!flag) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: `Unable to delete ptypes`,
      })
    }*/
    return res.json({
      success: true,
      
    })
  }
}
function id(id: any, ptypes: Ptypes) {
  throw new Error('Function not implemented.');
} 