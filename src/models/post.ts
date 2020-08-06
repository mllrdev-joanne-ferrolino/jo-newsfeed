import { Comment } from "./comment";

export type Post = {
  index: number;
  id: number;
  message: string;
  date: string;
  comments?: Comment[];
};
