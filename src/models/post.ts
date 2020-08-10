import { Comment } from "./comment";

export type Post = {
  index: number;
  id: number;
  message: string;
  date: string;
  comments?: Comment[];
};

// interface IPost {
//   index: number;
//   id: number;
//   message: string;
//   date: string;
//   comments?: Comment[];
// };

// export const post: IPost = {
//   index: 0,
//   id: 0,
//   message: "",
//   date: "",
//   comments: []
// }
