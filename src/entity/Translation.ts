import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from './Word';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Word, (word) => word.logs)
  @JoinColumn({ name: 'word_id' })
  word: Word;

  @Column()
  translation: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
