export interface Permission {
  name: string;
  module: string;
}

export class RoleVO {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly permissions: Permission[],
  ) {}

  hasPermission(permission: Permission): boolean {
    return this.permissions.some(
      (p) => p.name === permission.name && p.module === permission.module,
    );
  }
}

export class DecodedTokenVO {
  constructor(
    public readonly sub: string,
    public readonly username: string,
    public readonly role: RoleVO,
    public readonly iat: number,
    public readonly exp: number,
  ) {}

  isExpired(): boolean {
    const now = Math.floor(Date.now() / 1000);
    return this.exp < now;
  }

  hasPermission(permission: Permission): boolean {
    return this.role.hasPermission(permission);
  }
}
