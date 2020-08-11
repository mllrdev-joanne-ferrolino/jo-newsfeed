import { Comment } from "./comment";

export interface Post {
  index: number;
  id: number;
  message: string;
  date: string;
  comments?: Comment[];
}
