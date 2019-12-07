import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Prediction } from './Prediction';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20
  })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'avatar_url',
    nullable: true
  })
  avatarUrl: string;

  @OneToMany(type => Prediction, prediction => prediction.user)
  predictions: Prediction[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
