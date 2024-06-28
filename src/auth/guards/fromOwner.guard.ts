import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class FromOwner implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // user from jwt
    const userId = +request.params.userId; // userId from url

    console.log(user)
    console.log(userId)

    if (user.userId !== userId) {
      throw new UnauthorizedException('Вы не имеете права доступа к этому ресурсу');
    }
    
    return true;
  }
}
