import { ExecutionContext, Injectable, UnauthorizedException ,Inject } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.username;
        return super.canActivate(context);
    }

    handleRequest(err, user) {        
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        
        return user;
      }
    
}
