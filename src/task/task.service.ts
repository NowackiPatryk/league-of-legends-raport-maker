import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CreateMatchDto } from 'src/match/dto/create-match.dto';
import { MatchService } from 'src/match/match.service';
import { RaportService } from 'src/raport/raport.service';
import { RiotService } from 'src/riot/riot.service';
import { UserService } from 'src/user/user.service';
import { raportTypeEnum } from 'src/raport/enum/raport-type.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskService {
  constructor(
    private matchService: MatchService,
    private userService: UserService,
    private riotService: RiotService,
    private raportService: RaportService,
    private configService: ConfigService,
  ) {}

  @Cron('0 0 * * *')
  async saveMatchesCreatedYesterday() {
    try {
      const users = await this.userService.getAll();

      for (const user of users) {
        const matchIds = await this.riotService.getMatchesIdsByPuuId(user.puuid);

        for (const matchId of matchIds) {
          const matchDetails = await this.riotService.getMatchDeatilsById(matchId);
          const { gameDuration, gameCreation } = matchDetails.info;

          if (!this.matchService.checkIfMatchIsCreatedYesterday(gameCreation)) {
            continue;
          }

          const filteredPlayer = matchDetails.info.participants.filter(
            (player) => player.puuid === user.puuid,
          );

          const createMatchDto: CreateMatchDto = {
            ...filteredPlayer[0],
            gameDuration,
            gameCreation: new Date(gameCreation),
            win: filteredPlayer[0].win ? 1 : 0,
            userId: user.id,
          };

          await this.matchService.create(createMatchDto);
        };
      };

    } catch (err) {
      console.log(err);
    }
  }

  @Cron('0 1 * * 0')
  async createWeeklyRaport() {
    const users = await this.userService.getAll();

    for (const user of users) {
      const matches = await this.matchService.getAll({ where: { userId: user.id }});
      const filteredMatches = this.matchService.getMatchesFromRecentDays(matches, 7);

      await this.raportService.createRaport(filteredMatches, raportTypeEnum.WEEKLY, user.id);
    }
  }

  @Cron('0 3 1 * *')
  async createMonthlyRaport() {
    const users = await this.userService.getAll();

    for (const user of users) {
      const matches = await this.matchService.getAll({ where: { userId: user.id }});
      const filteredMatches = this.matchService.getMatchesFromRecentDays(matches, 30);

      await this.raportService.createRaport(filteredMatches, raportTypeEnum.MONTHLY, user.id);
    }
  }

  @Cron('55 * * * * *') // ('0 4 * * *')
  async deleteUselessMatches() {
    this.matchService.deleteOlderThanMonth();
  }
}
