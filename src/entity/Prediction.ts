import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Game } from "./Game";
import { User } from "./User";

@Entity()
export class Prediction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Game, game => game.predictions)
    @JoinColumn({ name: 'game_id' })
    game: Game;

    @ManyToOne(type => User, user => user.predictions)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'home_team_score' })
    homeTeamScore: number;

    @Column({ name: 'away_team_score' })
    awayTeamScore: number;
}