import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateMatchDto {
  @IsNotEmpty()
  @IsNumber()
  gameDuration: number;

  @IsNotEmpty()
  gameCreation: any;

  @IsNotEmpty()
  @IsNumber()
  kills: number;

  @IsNotEmpty()
  @IsNumber()
  deaths: number;

  @IsNotEmpty()
  @IsNumber()
  assists: number;

  @IsNotEmpty()
  @IsNumber()
  totalMinionsKilled: number;

  @IsNotEmpty()
  @IsNumber()
  visionScore: number;

  @IsNotEmpty()
  @IsNumber()
  wardsPlaced: number;

  @IsNotEmpty()
  @IsNumber()
  win: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}