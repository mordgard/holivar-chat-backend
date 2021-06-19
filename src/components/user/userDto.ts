import { Topic } from "../../types";

export interface UserDto {
  id?: string;
  email: string;
  password: string;
  status?: "new" | "active" | "archived";
  role?: "moderator" | "admin";
  topicsAnswers: Topic[];
}
