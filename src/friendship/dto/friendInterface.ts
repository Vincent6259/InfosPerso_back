import type { confidentiality } from '@prisma/client';
export interface FriendDto {
  userTag: string;
  confidentiality_level: confidentiality;
  firstName?: string;
  lastName?: string;
}
