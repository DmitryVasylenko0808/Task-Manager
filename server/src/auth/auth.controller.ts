import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {   
    constructor(private readonly authService: AuthService) {}

    @Post("sign-up")
    async signUp(@Body() body: SignUpDto) {
        return await this.authService.signUp(body);
    }

    @Post("sign-in")
    @HttpCode(200)
    async signIn(@Body() body: SignInDto) {
        return await this.authService.signIn(body);
    }

    @Get("me")
    getMe(@Request() req) {}
}
