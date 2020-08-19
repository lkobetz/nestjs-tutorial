import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// Observable makes it easier for us to compose asynchronous or callback-based code. Powerful alternative to promises or callbacks
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    // data is the response from next.handle()
    return next.handle().pipe(map(data => ({ data })));
  }
}
