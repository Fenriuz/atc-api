import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello world!',
      api: 'A tu casa customers API',
      ENV: {
        environment: process.env.NODE_ENV,
        date: new Date().toISOString(),
        localDate: new Date().toLocaleTimeString('en-HN', {
          hour12: false,
          weekday: 'long',
        }),
      },
    };
  }
}
