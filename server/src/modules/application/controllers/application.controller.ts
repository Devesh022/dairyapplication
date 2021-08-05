import { Controller, Get } from '@nestjs/common';

@Controller('application')
export class ApplicationController {
  @Get()
  index() {
    return {
      message: 'Welcome to Dairy Application',
    };
  }
}
