export interface IUserDto {
  id: string;
  email: string;
  password: string;
  status: "new" | "active" | "archived";
  role: "moderator" | "admin";
}
