import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RegionEnum } from "src/riot/enum/region.enum";

export class FindUserDto {
  @IsNotEmpty()
  @IsString()
  summonerName: string;

  @IsNotEmpty()
  @IsEnum(RegionEnum)
  region: RegionEnum;
}
