import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionHttpFilter } from './common/filter/exception-http-filter.filter';
import { ResponseTransformerInterceptor } from './core/http/response-transformer.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionHttpFilter,
    },
  ],
})
export class AppModule {}
