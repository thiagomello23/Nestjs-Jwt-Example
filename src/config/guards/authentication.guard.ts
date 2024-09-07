import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express"
import { ROLE } from "../decorators/role.decorator";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly prismaService: PrismaService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http = context.switchToHttp()
        const request: Request = http.getRequest()
        
        const token = request.headers.authorization;

        const role = this.reflector.getAllAndOverride(ROLE, [
            context.getHandler(),
            context.getClass()
        ])

        if(role === "public" && !token) {
            return true;
        }

        if(!token) {
            throw new UnauthorizedException("Usuário não autorizado")
        }

        try {
            const payload: PayloadAuth = await this.jwtService.verify(token)

            // Puxa o usuario e valida qual e sua role
            const uData = await this.prismaService.user.findUnique({
                where: {
                    id: +payload.id
                }
            })

            if(uData.role !== role && role !== "public") {
                throw new UnauthorizedException("Usuário não autorizado")
            }

            request['user'] = uData;
        } catch {
            throw new UnauthorizedException("Usuário não autorizado")
        }

        return true;
    }
}