import { reactive, computed } from "@vue/composition-api";
import { Post } from "../models/post";

export const Store = {
  posts: [] as Post[]
};
export function useStore() {
  const storePosts = reactive(Store.posts);
  function getIndex(id: number) {
    return computed(() => storePosts.findIndex((e: Post) => e.id === id));
  }
  function addPost(post: Post) {
    storePosts.push(post);
  }
  function deletePost(id: number) {
    storePosts.splice(storePosts.findIndex((e: Post) => e.id === id)!, 1);
  }

  function updatePost(post: Post) {
    storePosts[post.index] = post;
  }
  return {
    addPost,
    deletePost,
    updatePost,
    getIndex,
    storePosts
  };
}
