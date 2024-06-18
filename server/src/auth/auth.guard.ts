import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req);

    if (!token) {
      throw new BadRequestException("You are not authorized");
    }

    try {
      const payload = await this.authService.verifyToken(token);

      req.user = payload;
    } catch {
      throw new BadRequestException("You are not authorized");
    }

    return true;
  }

  private extractToken(req: Request) {
    const [type, token] = req.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : null;
}
}
