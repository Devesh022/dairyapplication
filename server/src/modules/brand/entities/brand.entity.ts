import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BrandStatus } from "../enums/brand-status";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn({unsigned: true})
  Id: number;

  @Column({type: 'varchar', length: 64})
  Title: string;

  @Column({type: 'varchar', length: 255, nullable: true})
  Description: string;

  @Column({type: 'tinyint', default: BrandStatus.ACTIVE})
  Status: number;

  @Column({type: 'tinyint', default: 0, nullable: true})
  IsDeleted: number;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  ModifiedDate: Date;
}