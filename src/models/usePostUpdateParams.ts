import { IComment } from "@/models/comment.ts";
export interface IUsePostUpdateParams {
  id: number;
  message: string;
  comments: IComment[];
}
