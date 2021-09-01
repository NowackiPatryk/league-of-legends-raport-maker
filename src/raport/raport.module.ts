import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchModule } from 'src/match/match.module';
import { Raport } from './raport.entity';
import { RaportService } from './raport.service';

@Module({
  imports: [TypeOrmModule.forFeature([Raport]), MatchModule],
  providers: [RaportService],
  exports: [RaportService],
})
export class RaportModule {}
