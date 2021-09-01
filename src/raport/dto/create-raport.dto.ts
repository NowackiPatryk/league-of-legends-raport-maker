import { IsDecimal, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/user/user.entity";
import { raportTypeEnum } from "../enum/raport-type.enum";

export class CreateRaportDto {

  @IsNotEmpty()
  @IsDecimal()
  kda: number;

  @IsNotEmpty()
  @IsNumber()
  winRate: number;

  @IsNotEmpty()
  @IsNumber()
  minionsPerMin: number;

  @IsNotEmpty()
  @IsNumber()
  wardsPerGame: number;

  @IsNotEmpty()
  @IsNumber()
  visionScorePerGame: number;

  user: User;

  @IsNotEmpty()
  @IsEnum(raportTypeEnum)
  type: raportTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  numberOfGames: number;
}
