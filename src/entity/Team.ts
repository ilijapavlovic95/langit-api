import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column({ name: 'logo_url' })
    logoUrl: string;

    @OneToMany(type => Game, game => game.homeTeam)
    homeGames: Game[];

    @OneToMany(type => Game, game => game.awayTeam)
    awayGames: Game[];
}