export interface UserSafePayload {
  id: number;
}

export type authenticationWithUserResponse = {
  user: UserSafePayload;
  tokens: Tokens;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
