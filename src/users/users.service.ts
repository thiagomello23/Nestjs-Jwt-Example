import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class UsersService {

    constructor(
        private readonly prismaService: PrismaService
    ){}

    createNewUser(user: CreateUserDto) {


    }
}
// Validação, criptografia de senha, inserção no banco