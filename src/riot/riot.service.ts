import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { RegionEnum } from './enum/region.enum';

@Injectable()
export class RiotService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    ) {}

  async findSummoner(
    summonerName: string,
    region: RegionEnum,
  ): Promise<Record<string, any>> {
    const url =
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${this.configService.get('riotApiKey')}`;

    const observable = this.httpService.get(url);
    const response = await firstValueFrom(observable);

    return response.data;
  }

  async getMatchesIdsByPuuId(
    puuId: string,
  ): Promise<any> {
    const url =
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuId}/ids?type=ranked&start=0&count=20&api_key=${this.configService.get('riotApiKey')}`;

    const observable = this.httpService.get(url);
    const response = await firstValueFrom(observable);

    return response.data;
  }

  async getMatchDeatilsById(matchId) {
    const url =
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.configService.get('riotApiKey')}`;

    const observable = this.httpService.get(url);
    const response = await firstValueFrom(observable);

    return response.data;
  }
}
