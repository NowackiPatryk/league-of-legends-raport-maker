import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  async getAll(where?: FindManyOptions): Promise<Match[]> {
    return this.matchRepository.find(where);
  }

  async create(
    createMatchDto: CreateMatchDto,
  ): Promise<Match> {
    return this.matchRepository.save(createMatchDto);
  }

  async deleteOlderThanMonth(): Promise<void> {
    const now = new Date();
    const criteriumDate = new Date(
      now.setMonth(now.getMonth() - 1)
    )

    const matches = await this.matchRepository.find({
      where: {
        gameCreation: LessThan(criteriumDate),
      },
    });

    const matchIds = matches.map((match) => match.id);

    if (matchIds.length) {
      await this.matchRepository.delete(matchIds);
    }
  }

  checkIfMatchIsCreatedYesterday(creationTime): boolean {
    const today = new Date();
    const yesterday = new Date(
      today.setDate(today.getDate() -1)
    );

    const matchCreationTime = new Date(creationTime);

    return yesterday.getDate() === matchCreationTime.getDate() &&
    yesterday.getMonth() === matchCreationTime.getMonth() &&
    yesterday.getFullYear() === matchCreationTime.getFullYear();
  }

  getMatchesFromRecentDays(
    matches: Match[],
    days = 7,
  ): Match[] {
    return matches.filter((match) => {
      const matchDate = new Date(match.gameCreation);
      const today = new Date();
      const diffrenceInDays = (today.getTime() - matchDate.getTime()) / (1000 * 3600 * 24);

      if (diffrenceInDays < days) {
        return match;
      }
    });
  }
}
