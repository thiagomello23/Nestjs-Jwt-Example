import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ){}

    async login(
        loginDto: LoginDto
    ): Promise<Token> {
        const u = await this.prismaService.user.findUnique({
            where: {
                email: loginDto.email
            }
        })

        if(u == null) {
            throw new BadRequestException("Usuario Invalido!")
        }

        const valid = await bcrypt.compare(loginDto.password, u.password);

        if(!valid) {
            throw new ForbiddenException("Usuário ou senha invalido")
        }

        const token =  this.jwtService.sign({
            id: u.id
        })

        return {
            token: token
        };
    }
}