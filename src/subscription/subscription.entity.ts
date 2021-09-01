import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from "typeorm";

@Entity()
export class Raport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  winRate: number;

  @Column()
  minionsPerMin: number;

  @Column()
  wardsPerGame: number;

  @Column()
  visionScorePerGame: number;

  @Column()
  numberOfGames: number;
}