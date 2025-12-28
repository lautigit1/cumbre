import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard para proteger rutas con JWT
 */
@Injectable()
export class GuardJwt extends AuthGuard('jwt') {}
