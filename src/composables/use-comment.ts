import { IComment } from "./../models/comment";
import { useStore } from "./use-store";
import { usePost } from "./use-post";

export function useComment() {
  const { storePosts, getIndex } = useStore();
  const { getPost } = usePost();
  function getCommentList(postId: number) {
    const postIndex = getIndex(postId);
    return storePosts[postIndex].comments ?? [];
  }

  function getCommentId(postId: number) {
    const comments = getCommentList(postId);
    return comments.length ? comments[comments.length - 1].id : 0;
  }

  function addComment(values: any) {
    let commentId = getCommentId(values.postId);
    const comment: IComment = {
      id: commentId + 1,
      postId: values.postId,
      message: values.message,
      date: new Date().toLocaleString(),
      isSelected: false
    };
    const post = getPost(values.postId);
    if (post.comments?.push(comment)) {
      commentId++;
    } else {
      return false;
    }
    return true;
  }
  function deleteComment(postId: number, index: number) {
    const comments = getCommentList(postId);
    return comments.splice(index, 1) ? true : false;
  }

  function updateComment(values: any) {
    const comments = getCommentList(values.postId);
    if (comments) {
      const commentItem = comments[values.index];
      commentItem.message = values.message;
      commentItem.date = new Date().toLocaleString();
      commentItem.isSelected = false;
    } else {
      return false;
    }
    return true;
  }

  function getSelectedComment(postId: number, index: number) {
    const comments = getCommentList(postId);
    comments[index].isSelected = true;
    return comments[index];
  }
  return {
    addComment,
    deleteComment,
    updateComment,
    getSelectedComment
  };
}
