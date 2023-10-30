export class JwtSessionPayload {
  token_id: string;
  user_id: string;
  username: string;
  type: TokenType;
  role: AuthorizationRoles;

  constructor(
    token_id: string,
    user_id: string,
    username: string,
    type: TokenType,
    role: AuthorizationRoles,
  ) {
    this.token_id = token_id;
    this.user_id = user_id;
    this.username = username;
    this.type = type;
    this.role = role;
  }
}
export enum TokenType {
  Refresh = 'refresh',
  Access = 'access',
}
export enum AuthorizationRoles {
  Guest = 'guest',
  User = 'user',
  Admin = 'admin',
}
