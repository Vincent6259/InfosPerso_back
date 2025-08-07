import { Controller, Get, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

interface MessageEvent {
  data: string;
}

@Controller('events')
export class SseController {
  @Get('stream')
  @Sse()
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((count) => ({
        data: JSON.stringify({
          message: `Event number ${count}`,
          timestamp: new Date().toISOString(),
        }),
      })),
    );
  }
}
