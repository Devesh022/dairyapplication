import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductStatus } from "../enums/product-status";

@Entity()
export class Product {
  @PrimaryGeneratedColumn({unsigned: true})
  Id: number;

  @Column({type: 'varchar', length: 64})
  ProductName: string;

  @Column({type: 'varchar', length: 255, nullable: true})
  ProductDescription: string;

  @Column({type: 'tinyint', default: ProductStatus.ACTIVE})
  ProductStatus: string;

  @Column({type: 'tinyint', default: 0, nullable: true})
  IsDeleted: number;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  ModifiedDate: Date;
}