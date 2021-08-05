import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { BrandModule } from '../brand/brand.module';
import { PtypesModule } from '../product-types/ptypes.module';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';
import { ApplicationController } from './controllers/application.controller';

@Module({
  imports: [ // All the feature modules would be added here
    UsersModule, 
    AuthenticationModule,
    BrandModule,
    PtypesModule,
    ProductModule,
  ],
  controllers: [
    ApplicationController
  ],
})
export class ApplicationModule {}
