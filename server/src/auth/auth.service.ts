import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from "bcrypt";
import { User } from '@prisma/client';
import { SignInDto } from './dto/sign-in.dto';
import { jwtConstants } from './auth.constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async signUp(body: SignUpDto) {
        const { login, password } = body;

        const user = await this.prismaService.user.findFirst({
            where: { login }
        });

        if (user) {
            throw new BadRequestException("User with this login already exists");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await this.prismaService.user.create({
            data: {
                login,
                password_hash: passwordHash
            }
        });

        const token = await this.generateToken(newUser);

        return token;
    }

    async signIn(body: SignInDto) {
        const { login, password } = body;

        const user = await this.prismaService.user.findFirst({
            where: { login }
        });

        if (!user) {
            throw new BadRequestException("Invalid login or password");
        }

        const isValidPass = await bcrypt.compare(password, user.password_hash);

        if(!isValidPass) {
            throw new BadRequestException("Invalid login or password");
        }

        const token = await this.generateToken(user);

        return token;
    }

    async verifyToken(token: string) {
        const payload = await this.jwtService.verifyAsync(
            token, 
            { secret: jwtConstants.secret }
        );

        return payload;
    }

    private async generateToken(user: User) {
        const { password_hash, ...payload } = user;

        const token = await this.jwtService.signAsync(payload);

        return { token };
    }
}
