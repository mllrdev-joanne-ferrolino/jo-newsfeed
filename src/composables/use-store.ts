import { reactive, computed } from "@vue/composition-api";
import { IPost } from "../models/post";

export const Store = {
  posts: [] as IPost[]
};
export function useStore() {
  const storePosts = reactive<IPost[]>(Store.posts);
  const post: IPost = {
    index: 0,
    id: 0,
    message: "",
    date: "",
    comments: []
  };
  function getIndex(id: number) {
    return computed(() => storePosts.findIndex((e: IPost) => e.id === id));
  }
  function getPost(id: number) {
    return storePosts.find(p => p.id === id) ?? post;
  }
  return {
    getIndex,
    getPost,
    storePosts
  };
}
