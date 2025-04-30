import { SetMetadata } from '@nestjs/common';

export const PermissionsDecorator = (
  ...permissions: { name: string; module: string }[]
) => {
  return SetMetadata('permissions', permissions);
};
