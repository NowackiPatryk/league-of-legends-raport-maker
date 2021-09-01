import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/match/match.entity';
import { Repository } from 'typeorm';
import { CreateRaportDto } from './dto/create-raport.dto';
import { raportTypeEnum } from './enum/raport-type.enum';
import { Raport } from './raport.entity';

@Injectable()
export class RaportService {
  constructor(
    @InjectRepository(Raport)
    private raportRepository: Repository<Raport>,
  ) {}

  async createRaport(matches: Match[], type: raportTypeEnum, userId) {
    if (!matches.length) {
      return;
    }

    const raport: CreateRaportDto = {
      kda: 0,
      winRate: 0,
      minionsPerMin: 0,
      wardsPerGame: 0,
      visionScorePerGame: 0,
      numberOfGames: matches.length,
      type,
      user: userId,
    };

    matches.forEach(match => {
      const gameLengthInMinutes = (match.gameDuration / 1000) / 60;

      raport.kda += ((match.kills + match.assists ) / match.deaths ? match.deaths : 1) / matches.length;
      raport.winRate += (match.win / matches.length) * 100;
      raport.minionsPerMin += (match.totalMinionsKilled / gameLengthInMinutes) / matches.length;
      raport.wardsPerGame += match.wardsPlaced / matches.length;
      raport.visionScorePerGame += match.visionScore / matches.length;
    });

    await this.raportRepository.save(raport);
  }
}
