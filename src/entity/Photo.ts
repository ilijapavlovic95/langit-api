import { Location } from './Location';
import { User } from './User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  likes: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  timestamp: Date;

  @ManyToOne(type => User, user => user.photos)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Location, location => location.photos)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  generateFilename(fileExt: string) {
    this.filename = crypto
      .createHash('md5')
      .update(this.title + fileExt)
      .digest('hex');
  }
}
