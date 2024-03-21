import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(username: any,password:any): Promise<string> {
        return this.jwtService.sign({ username, password });
      }
}
