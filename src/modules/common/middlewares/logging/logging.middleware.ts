import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    // console.log('Request-response time')
    // console.log('middle')

    // res.on('finish', () => console.timeEnd('Request-response time'))
    next();
  }
}
