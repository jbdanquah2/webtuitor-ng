import {Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, BeforeInsert} from 'typeorm';
// import * as bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer';
const bcrypt = require('bcryptjs');


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  role: string;

  @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  last_login: Date;

  @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    console.log('#3hashPassword', this.password );
    if (this.password) {
      const salt = await bcrypt.genSalt(); // Generate a salt
      this.password = await bcrypt.hash(this.password, salt); // Hash the password with salt

      console.log('#4hashPassword', this.password );
    }
  }
}
