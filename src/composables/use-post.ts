import { useStore } from "./use-store";
import { IPost } from "../models/post";
import { IComment } from "../models/comment";

export function usePost() {
  enum Label {
    POST = "Post",
    UPDATE = "Update"
  }
  const { storePosts, getIndex } = useStore();
  function getPostId() {
    return storePosts.length ? storePosts[storePosts.length - 1].id : 0;
  }
  let postItemId = getPostId();
  function addPost(message: string) {
    const post: IPost = {
      index: 0,
      id: postItemId + 1,
      comments: [],
      message: message,
      date: new Date().toLocaleString()
    };
    storePosts.push(post);
    postItemId++;
  }
  function deletePost(id: number) {
    storePosts.splice(storePosts.findIndex((e: IPost) => e.id === id) ?? [], 1);
  }
  function updatePost(message: string, comments: IComment[]) {
    const post: IPost = {
      index: getIndex(postItemId).value,
      id: postItemId,
      message: message,
      date: new Date().toLocaleString(),
      comments: comments
    };
    storePosts[post.index] = post;
  }

  return {
    addPost,
    deletePost,
    updatePost,
    Label,
    getPostId
  };
}
