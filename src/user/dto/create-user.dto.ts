import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RegionEnum } from "src/riot/enum/region.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  summonerName: string;

  @IsNotEmpty()
  @IsString()
  puuid: string;

  @IsNotEmpty()
  @IsEnum(RegionEnum)
  region: RegionEnum;
}
