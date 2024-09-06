import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import type { User } from '@prisma/client'
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {

    private hashSalt = 10;

    constructor(
        private readonly prismaService: PrismaService
    ){}

    async createNewUser(user: CreateUserDto): Promise<User> {
        const email = user.email;

        const u = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })

        if(u !== null) {
            throw new BadRequestException("Email já em uso!")
        }

        const hashPass = await bcrypt.hash(user.password, this.hashSalt)

        return await this.prismaService.user.create({
            data: {
                name: user.name,
                email: user.email,
                cellphone: user.cellphone,
                password: hashPass
            }
        })
    }
}