import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Competition } from "./Competition";
import { Team } from "./Team";
import { Prediction } from "./Prediction";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    code: string;

    @Column({ name: 'logo_url' })
    logoUrl: string;

    @ManyToOne(type => Competition, competition => competition.games)
    @JoinColumn({ name: 'competition_id' })
    competition: Competition;

    @ManyToOne(type => Team, team => team.homeGames)
    @JoinColumn({ name: 'home_team_id' })
    homeTeam: Team;

    @ManyToOne(type => Team, team => team.awayGames)
    @JoinColumn({ name: 'away_team_id' })
    awayTeam: Team;

    @Column({ name: 'home_team_score' })
    homeTeamScore: number;

    @Column({ name: 'away_team_score' })
    awayTeamScore: number;

    @OneToMany(type => Prediction, prediction => prediction.game)
    predictions: Prediction[];
}