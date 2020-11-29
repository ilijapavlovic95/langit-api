import * as bcrypt from 'bcryptjs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
  })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'avatar_url',
    nullable: true,
  })
  avatarUrl: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
