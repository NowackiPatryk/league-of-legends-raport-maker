import { User } from "src/user/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from "typeorm";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.matches)
  user: User;

  @Column()
  userId: number;

  @Column('int')
  gameDuration: number;

  @Column('datetime')
  gameCreation: number;

  @Column()
  kills: number;

  @Column()
  deaths: number;

  @Column()
  assists: number;

  @Column()
  totalMinionsKilled: number;

  @Column()
  visionScore: number;

  @Column()
  wardsPlaced: number;

  @Column()
  win: number;
}