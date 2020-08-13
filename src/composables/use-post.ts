import { useStore } from "./use-store";
import { IComment } from "../models/comment";

export function usePost() {
  enum Label {
    POST = "Post",
    UPDATE = "Update"
  }
  const { storePosts, getIndex, post } = useStore();
  function getPostId() {
    return storePosts.length ? storePosts[storePosts.length - 1].id : 0;
  }
  let postItemId = getPostId();
  function addPost(message: string) {
    post.index = 0;
    post.id = postItemId + 1;
    post.comments = [];
    post.message = message;
    post.date = new Date().toLocaleString();
    storePosts.push(post);
    postItemId++;
  }
  function deletePost(id: number) {
    const postIndex = getIndex(id);
    storePosts.splice(postIndex, 1);
  }
  function updatePost(message: string, comments: IComment[]) {
    post.index = getIndex(postItemId);
    post.id = postItemId;
    post.message = message;
    post.date = new Date().toLocaleString();
    post.comments = comments;
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
