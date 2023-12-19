import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const InjectUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    req.body.user = { id: req.user.id };
    console.log(`request: ${req.body.user}`);
    return req.body;
  },
);