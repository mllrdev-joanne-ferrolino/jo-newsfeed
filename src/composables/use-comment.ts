import { Comment } from "./../models/comment";
import { useStore } from "./use-store";
import { reactive, computed } from "@vue/composition-api";

export function useComment() {
  const { storePosts, getIndex } = useStore();

  function addComment(comment: Comment) {
    const post = storePosts.find(p => p.id === comment.postId);
    if (post) {
      post?.comments?.push(comment);
      console.log(`success - comment added ${post.message}`);
    } else {
      console.log(`fail in post id ${comment.postId}`);
    }
  }
  function deleteComment(postId: number, index: number) {
    const postIndex = getIndex(postId).value;
    storePosts[postIndex].comments?.splice(index, 1);
  }

  return { addComment, deleteComment };
}
