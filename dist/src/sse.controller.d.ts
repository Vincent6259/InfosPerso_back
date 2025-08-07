import { Observable } from 'rxjs';
interface MessageEvent {
    data: string;
}
export declare class SseController {
    sse(): Observable<MessageEvent>;
}
export {};
