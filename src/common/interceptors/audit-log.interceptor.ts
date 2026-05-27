import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'] as { id: number } | undefined;
    const method = request.method;
    const path = request.path;
    const body = request.body;

    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

    if (!isMutation) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (response) => {
        try {
          await this.prisma.auditLog.create({
            data: {
              userId: user?.id || 0,
              action: method,
              entity: this.extractEntity(path),
              entityId: response?.data?.id || null,
              changes: JSON.stringify({ request: body, response }),
              ip: request.ip || '0.0.0.0',
              userAgent: request.headers['user-agent'] || '',
            },
          });
        } catch (error) {
          console.error('Failed to create audit log:', error);
        }
      }),
    );
  }

  private extractEntity(path: string): string {
    const parts = path.split('/').filter(Boolean);
    return parts[1] || 'unknown';
  }
}
