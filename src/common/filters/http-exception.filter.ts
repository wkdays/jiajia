import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from '../constants/error-codes';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    const errorResponse = {
      code: this.mapStatusToErrorCode(status),
      message: exceptionResponse.message || exception.message,
      errors: Array.isArray(exceptionResponse.message) ? exceptionResponse.message.map((msg: string) => ({ message: msg })) : undefined,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }

  private mapStatusToErrorCode(status: number): number {
    switch (status) {
      case 400: return ErrorCode.BAD_REQUEST;
      case 401: return ErrorCode.UNAUTHORIZED;
      case 403: return ErrorCode.FORBIDDEN;
      case 404: return ErrorCode.NOT_FOUND;
      case 409: return ErrorCode.CONFLICT;
      case 429: return ErrorCode.TOO_MANY_REQUESTS;
      case 500: return ErrorCode.INTERNAL_ERROR;
      default: return ErrorCode.INTERNAL_ERROR;
    }
  }
}
