import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express"
import { ROLE } from "../decorators/role.decorator";

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http = context.switchToHttp()
        const request: Request = http.getRequest()
        
        const token = request.headers.authorization;

        const role = this.reflector.get<string>(ROLE, context.getHandler())

        if(role === "public") {
            return true;
        }

        if(!token) {
            throw new UnauthorizedException("Usuário não autorizado")
        }

        try {
            const payload = await this.jwtService.verify(token)

            // console.log(payload)
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException("Usuário não autorizado")
        }

        return true;
    }
}