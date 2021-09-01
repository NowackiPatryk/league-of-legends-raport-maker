import { Match } from "src/match/match.entity";
import { RegionEnum } from "src/riot/enum/region.enum";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  summonerName: string;

  @Column()
  puuid: string;

  @Column({
    type: 'enum',
    enum: RegionEnum,
  })
  region: RegionEnum;

  @OneToMany(() => Match, (match) => match.user)
  matches: Match[];
}