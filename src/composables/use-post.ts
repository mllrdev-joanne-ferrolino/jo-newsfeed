import { useStore } from "./use-store";
import { IPost } from "../models/post";

export function usePost() {
  const post: IPost = {
    id: 0,
    message: "",
    date: "",
    comments: []
  };
  const { storePosts, getIndex } = useStore();
  function getPost(id: number) {
    return storePosts.find((p: IPost) => p.id === id) ?? post;
  }
  function getPostId() {
    return storePosts.length ? storePosts[storePosts.length - 1].id : 0;
  }
  let postItemId = getPostId();
  function addPost(message: string) {
    const post = {
      id: postItemId + 1,
      comments: [],
      message: message,
      date: new Date().toLocaleString()
    };

    if (storePosts.push(post)) {
      postItemId++;
    } else {
      return false;
    }
    return true;
  }
  function deletePost(id: number) {
    const postIndex = getIndex(id);
    return storePosts.splice(postIndex, 1) ? true : false;
  }
  function updatePost(values: any) {
    const post = {
      id: values.post.id,
      message: values.message,
      date: new Date().toLocaleString(),
      comments: values.post.comments
    };
    if (post) {
      storePosts[getIndex(post.id)] = post;
    } else {
      return false;
    }
    return true;
  }

  return {
    addPost,
    deletePost,
    updatePost,
    getPostId,
    getPost
  };
}
