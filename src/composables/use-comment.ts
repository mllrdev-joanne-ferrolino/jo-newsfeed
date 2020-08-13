import { IComment } from "./../models/comment";
import { useStore } from "./use-store";

export function useComment() {
  enum Label {
    COMMENT = "Comment",
    UPDATE = "Update"
  }
  const { storePosts, getIndex, getPost } = useStore();
  function getCommentList(postId: number) {
    const postIndex = getIndex(postId);
    return storePosts[postIndex].comments ?? [];
  }

  function getCommentId(postId: number) {
    const comments = getCommentList(postId);
    return comments.length ? comments[comments.length - 1].id : 0;
  }

  function addComment(postId: number, message: string) {
    let commentId = getCommentId(postId);
    const comment: IComment = {
      id: commentId + 1,
      postId: postId,
      message: message,
      date: new Date().toLocaleString(),
      isSelected: false
    };
    const post = getPost(postId);
    post.comments?.push(comment);
    commentId++;
  }
  function deleteComment(postId: number, index: number) {
    const comments = getCommentList(postId);
    comments.splice(index, 1);
  }

  function updateComment(postId: number, message: string, index: number) {
    const comments = getCommentList(postId);
    const commentItem = comments[index];
    commentItem.message = message;
    commentItem.date = new Date().toLocaleString();
    commentItem.isSelected = false;
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
    getSelectedComment,
    Label
  };
}
