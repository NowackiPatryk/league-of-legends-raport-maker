import { Module } from '@nestjs/common';
import { MatchModule } from 'src/match/match.module';
import { RaportModule } from 'src/raport/raport.module';
import { RiotModule } from 'src/riot/riot.module';
import { UserModule } from 'src/user/user.module';
import { TaskService } from './task.service';

@Module({
  imports: [UserModule, MatchModule, RiotModule, RaportModule],
  controllers: [],
  providers: [TaskService],
})

export class TaskModule {}
