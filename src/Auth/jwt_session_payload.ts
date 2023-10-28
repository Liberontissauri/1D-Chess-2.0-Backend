export class JwtSessionPayload {
  token_id: string;
  user_id: string;
  username: string;
  role: AuthorizationRoles;

  constructor(
    token_id: string,
    user_id: string,
    username: string,
    role: AuthorizationRoles,
  ) {
    this.token_id = token_id;
    this.user_id = user_id;
    this.username = username;
    this.role = role;
  }
}
export enum AuthorizationRoles {
  User = 'user',
  Admin = 'admin',
}
