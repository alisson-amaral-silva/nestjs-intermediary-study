import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { NestResponse } from './nest-response';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((controllerResponse: NestResponse) => {
        if (controllerResponse instanceof NestResponse) {
          const defaultContext = context.switchToHttp();
          const response = defaultContext.getResponse();
          const { headers, status, body } = controllerResponse;

          const headerNames = Object.getOwnPropertyNames(headers);
          headerNames.forEach((header) => {
            const headerValue = headers[header];
            this.httpAdapter.setHeader(response, header, headerValue);
          });

          this.httpAdapter.status(response, status);

          return body;
        }
        return controllerResponse;
      }),
    );
  }
}
