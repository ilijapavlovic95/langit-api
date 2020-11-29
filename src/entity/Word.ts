import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Log } from './Log';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  english: string;

  @Column()
  translation: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @OneToMany((type) => Log, (log) => log.word)
  logs: Log[];
}
