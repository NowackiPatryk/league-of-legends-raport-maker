import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOneBySummonerName(summonerName: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        summonerName,
      },
    })
  }

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<User> {
    return this.userRepository.save(createUserDto);
  }
}
