import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async Auth(credentials: any) {
    const user = await this.CheckCredentials(credentials);

    const simplifiedPermissions = (user.role.permissions || [])
      .filter((p) => p.action && p.module)
      .map((permission) => ({
        name: permission.action.name,
        module: permission.module.name,
      }));

    const payload = {
      sub: user.id,
      username: user.name,
      role: {
        id: user.role.id,
        name: user.role.name,
        permissions: simplifiedPermissions,
      },
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  private async CheckCredentials(credentials: any) {
    const user = await this.userService.findByCredentials(
      credentials.id,
      credentials.secret,
    );

    if (user != null) return user;
    else throw new UnauthorizedException();
  }
}
