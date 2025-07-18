import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    console.log(req.body);
    return true; // Replace with actual logic, but here as it returns true for all requests, so all will proceed.
  }
}