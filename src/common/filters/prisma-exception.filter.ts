import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { ErrorCode } from '../constants/error-codes';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let code = ErrorCode.INTERNAL_ERROR;
    let message = 'Database error';

    switch (exception.code) {
      case 'P2002':
        status = 409;
        code = ErrorCode.CONFLICT;
        message = `Unique constraint failed on field: ${exception.meta?.target}`;
        break;
      case 'P2025':
        status = 404;
        code = ErrorCode.NOT_FOUND;
        message = 'Record not found';
        break;
      case 'P2003':
        status = 400;
        code = ErrorCode.BAD_REQUEST;
        message = `Foreign key constraint failed on field: ${exception.meta?.field_name}`;
        break;
      default:
        message = exception.message;
    }

    response.status(status).json({
      code,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
