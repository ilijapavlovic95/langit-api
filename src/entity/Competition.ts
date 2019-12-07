import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity()
export class Competition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    sport: string;

    @Column()
    type: string;

    @OneToMany(type => Game, game => game.competition)
    games: Game[];
}