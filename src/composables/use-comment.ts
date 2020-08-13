import { IComment } from "./../models/comment";
import { useStore } from "./use-store";

export function useComment() {
  enum Label {
    COMMENT = "Comment",
    UPDATE = "Update"
  }
  const { storePosts, getIndex } = useStore();
  function addComment(id: number, postId: number, message: string) {
    const comment: IComment = {
      id: id,
      postId: postId,
      message: message,
      date: new Date().toLocaleString(),
      isSelected: false
    };
    const post = storePosts.find(p => p.id === comment.postId);
    post?.comments?.push(comment);
  }
  function deleteComment(postId: number, index: number) {
    const postIndex = getIndex(postId).value;
    storePosts[postIndex].comments?.splice(index, 1);
  }

  function updateComment(postId: number, message: string, index: number) {
    const postIndex = getIndex(postId).value;
    const commentItem = storePosts[postIndex].comments![index];
    commentItem.message = message;
    commentItem.date = new Date().toLocaleString();
    commentItem.isSelected = false;
  }

  return { addComment, deleteComment, updateComment, Label };
}
