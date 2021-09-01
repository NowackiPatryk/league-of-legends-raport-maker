import { User } from "src/user/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from "typeorm";
import { raportTypeEnum } from "./enum/raport-type.enum";

@Entity()
export class Raport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.matches)
  user: User;

  @Column('decimal', { precision: 3, scale: 2 })
  kda: number;

  @Column()
  winRate: number;

  @Column()
  minionsPerMin: number;

  @Column()
  wardsPerGame: number;

  @Column()
  visionScorePerGame: number;

  @Column()
  type: raportTypeEnum;

  @Column()
  numberOfGames: number;
}