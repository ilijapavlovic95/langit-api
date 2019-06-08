import { Photo } from './Photo';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Double,
  OneToMany
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  name: string;

  @Column()
  address: string;

  @Column('float')
  lat: Double;

  @Column('float')
  lng: Double;

  @Column({
    default: 'place'
  })
  type: string;

  @OneToMany(type => Photo, photo => photo.location)
  photos: Photo[];
}
