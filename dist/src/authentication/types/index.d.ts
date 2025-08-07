export type authenticationWithUserResponse = {
    user: any;
    tokens: Tokens;
};
export type Tokens = {
    access_token: string;
    refresh_token: string;
};
