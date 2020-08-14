import { IPost } from "./../models/post";
import { reactive } from "@vue/composition-api";

export const Store = {
  posts: [] as IPost[]
};
export function useStore() {
  const storePosts = reactive<IPost[]>(Store.posts);
  const post: IPost = {
    id: 0,
    message: "",
    date: "",
    comments: []
  };
  function getIndex(id: number) {
    return storePosts.findIndex((p: IPost) => p.id === id);
  }
  return {
    getIndex,
    storePosts,
    post
  };
}
