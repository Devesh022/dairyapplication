import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PtypesStatus } from "../enums/ptypes-status";

@Entity()
export class Ptypes {
  @PrimaryGeneratedColumn({ unsigned: true })
  Id: number;

  @Column({type: 'varchar', length: 64})
  Title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Description: string;

  @Column({ type: 'tinyint', default: PtypesStatus.ACTIVE })
  Status: number;

  @Column({ type: 'tinyint', default: 0, nullable: true })
  IsDeleted: number;

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  ModifiedDate: Date;
  Ptypes_Description: any;
  Ptypes_Status: number;
}