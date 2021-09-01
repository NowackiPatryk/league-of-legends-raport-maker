import { Body, Controller, Post } from '@nestjs/common';
import { RiotService } from 'src/riot/riot.service';
import { FindUserDto } from './dto/find-user.dto';
import { AddUserException } from './exceptions/add-user.exception';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private riotService: RiotService,
  ) {}

  @Post()
  async addUser(@Body() findUserDto: FindUserDto) {
    const { summonerName, region } = findUserDto;
    const user = await this.userService.getOneBySummonerName(summonerName);

    if (user && user.region === region) {
      throw new AddUserException('User already exists');
    }

    try {
      const userToCreate = await this.riotService.findSummoner(summonerName, region);

      await this.userService.createUser({
        summonerName: userToCreate.name,
        puuid: userToCreate.puuid,
        region,
      });
    } catch(err) {
      throw new AddUserException(err.message);
    }
  }
}
