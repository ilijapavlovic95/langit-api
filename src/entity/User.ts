import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';

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
    type: 'tinyint',
    name: 'is_public'
  })
  isPublic: boolean;

  @Column({
    name: 'avatar_url',
    nullable: true
  })
  avatarUrl: string;

  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
