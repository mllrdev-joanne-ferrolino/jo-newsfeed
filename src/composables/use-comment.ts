import { Comment } from "./../models/comment";
import { useStore } from "./use-store";
import { reactive } from "@vue/composition-api";

export function useComment() {
  const { storePosts } = useStore();
  const comment = reactive<Comment>({
    id: 0,
    postId: 0,
    message: "",
    date: "",
    isSelected: false
  });

  function getPost(postId: number) {
    return storePosts.find(p => p.id === postId);
  }

  const post = getPost(comment.postId);

  function addComment(comment: Comment) {
    const post = getPost(comment.postId);
    if (post) {
      post?.comments?.push(comment);
    } else {
      console.log(`fail - post id = ${comment.postId}`);
    }
  }
  function deleteComment(index: number) {
    const post = getPost(comment.postId);
    if (post) {
      post?.comments?.splice(index, 1);
    } else {
      console.log(`fail - post = ${storePosts}`);
    }
  }

  // const comments = reactive(storePosts)
  return { addComment, deleteComment };
}
