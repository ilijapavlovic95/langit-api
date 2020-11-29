import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from './Word';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Word, (word) => word.logs)
  @JoinColumn({ name: 'word_id' })
  word: Word;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column()
  result: 0 | 1;
}
