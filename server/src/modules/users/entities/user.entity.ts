import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Project Imports
import { UserStatus } from '../enums/user-status';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  Id: number;

  @Column({ type: 'varchar', length: 64 })
  Name: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  MobileNumber: string;

  @Column({ type: 'varchar', length: 10, nullable: true, default: null })
  AlternateMobileNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  EmailAddress: string;

  @Column({ type: 'varchar', length: 128, default: null })
  @Exclude()
  ResetPasswordToken: string;

  @Column({ type: 'varchar', length: 10, nullable: true, default: null })
  @Exclude()
  AccountVerificationToken: string;

  @Column({ type: 'tinyint', default: UserStatus.ACTIVE })
  Status: number;

  @Column()
  @Exclude()
  Password: string;

  @Column({ type: 'tinyint', default: 0 })
  IsDeleted: number;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.Password) {
      this.Password = bcrypt.hashSync(this.Password, 10);
    }
  }

  @CreateDateColumn()
  CreatedDate: Date;

  @UpdateDateColumn()
  ModifiedDate: Date;
}
