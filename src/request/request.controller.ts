import { Controller, Get, Req, MessageEvent, Sse } from '@nestjs/common';
import { RequestService } from './request.service';
import { AuthRequest } from 'src/authentication/authentication.guard';
import { Observable } from 'rxjs';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  findAll(@Req() req: AuthRequest) {
    const userId = req.user.sub;
    return this.requestService.findAll(userId);
  }

  @Sse('sse')
  requestStream(@Req() req: AuthRequest): Observable<MessageEvent> {
    return this.requestService.getRequestStream(req.user.sub);
  }
}
