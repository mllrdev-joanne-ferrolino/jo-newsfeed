import { IComment } from "./comment";

export interface IPost {
  index: number;
  id: number;
  message: string;
  date: string;
  comments?: IComment[];
}
