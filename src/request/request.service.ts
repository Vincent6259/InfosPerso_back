import { Injectable, MessageEvent } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { concat, from, map, Observable, Subject } from 'rxjs';

export interface FriendReqWithTagAndLevel {
  id: number;
  createdAt: Date;
  confidentiality: 'MAXIMUM' | 'CRITICAL' | 'MIDDLING' | 'MINIMUM';
  senderTag: string;
}

export interface InfoReqWithTagAndLabel {
  id: number;
  createdAt: Date;
  senderTag: string;
  userDataId: number;
  dataLabel: string;
}

@Injectable()
export class RequestService {
  private streams = new Map<number, Subject<MessageEvent>>();

  constructor(private readonly prisma: PrismaService) {}
  async findAll(userId: number): Promise<{
    friendRequests: FriendReqWithTagAndLevel[];
    infoRequests: InfoReqWithTagAndLabel[];
  }> {
    const [friendRequets, infosRequests] = await this.prisma.$transaction([
      this.prisma.friend_request.findMany({
        where: { receiver_id: userId },
        select: {
          id: true,
          created_at: true,
          confidentiality: true,
          user_sender: {
            select: { tag: true },
          },
        },
      }),
      this.prisma.information_request.findMany({
        where: { receiver_id: userId },
        select: {
          id: true,
          created_at: true,
          user_sender: {
            select: { tag: true },
          },
          user_info_id: {
            select: {
              id: true,
              data_label: {
                select: { label: true },
              },
            },
          },
        },
      }),
    ]);

    const friendRequests: FriendReqWithTagAndLevel[] = friendRequets.map(
      (fr) => ({
        id: fr.id,
        createdAt: fr.created_at,
        confidentiality: fr.confidentiality,
        senderTag: fr.user_sender.tag,
      }),
    );

    const infoRequests: InfoReqWithTagAndLabel[] = infosRequests.map((ir) => ({
      id: ir.id,
      createdAt: ir.created_at,
      senderTag: ir.user_sender.tag,
      userDataId: ir.user_info_id.id,
      dataLabel: ir.user_info_id.data_label.label,
    }));

    return { friendRequests, infoRequests };
  }

  getRequestStream(userId: number): Observable<MessageEvent> {
    if (!this.streams.has(userId)) {
      this.streams.set(userId, new Subject<MessageEvent>());
    }
    const updates$ = this.streams.get(userId)!.asObservable();

    const initial$ = from(this.findAll(userId)).pipe(
      map((requests) => ({
        data: JSON.stringify({ initial: true, request: requests }),
      })),
    );

    return concat(initial$, updates$);
  }
}
