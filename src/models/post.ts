import { IComment } from "./comment";

export interface IPost {
  id: number;
  message: string;
  date: string;
  comments?: IComment[];
}
