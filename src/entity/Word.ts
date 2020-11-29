import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Log } from './Log';
import { Translation } from './Translation';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  english: string;

  @OneToMany((type) => Translation, (translation) => translation.word)
  translations: Translation[];

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @OneToMany((type) => Log, (log) => log.word)
  logs: Log[];
}
