import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express"

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http = context.switchToHttp()
        const request: Request = http.getRequest()
        
        const token = request.headers.authorization;

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