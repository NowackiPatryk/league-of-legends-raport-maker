import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm';
import { MatchModule } from './match/match.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RiotModule } from './riot/riot.module';
import { RaportModule } from './raport/raport.module';
import { SubscriptionModule } from './subscription/subscription.module';
import riot from './config/riot';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        riot,
      ],
    }),

    TypeOrmModule.forRoot({
      ...typeOrmConfig,
    }),

    ScheduleModule.forRoot(),
    MatchModule,
    UserModule,
    TaskModule,
    RiotModule,
    RaportModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
