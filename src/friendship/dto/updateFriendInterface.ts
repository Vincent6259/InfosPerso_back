import { confidentiality } from '@prisma/client';

export interface PatchFriendConfidentialityResult {
  friendId: number;
  confidentiality: confidentiality;
}
