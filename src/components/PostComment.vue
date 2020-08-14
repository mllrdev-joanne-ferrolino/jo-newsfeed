<template>
  <div>
    <comment-item
      v-for="(comment, index) in commentList"
      :key="comment.id"
      :index="index"
      :comment="comment"
      @index="getSelectedComment(comment.postId, index)"
      @comment="deleteComment(comment.postId, index)"
      @values="updateComment"
    ></comment-item>
    <comment-form
      class="add-comment"
      :postId="post.id"
      @values="addComment"
    ></comment-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from "@vue/composition-api";
import CommentItem from "@/components/CommentItem.vue";
import CommentForm from "@/components/CommentForm.vue";
import { IPost } from "@/models/post";
import { IComment } from "@/models/comment";
import { useComment } from "@/composables/use-comment";

export default defineComponent({
  name: "post-comment",
  components: {
    CommentItem,
    CommentForm
  },
  props: {
    post: {
      type: Object as PropType<IPost>,
      required: true
    },
    comment: {
      type: Object as PropType<Comment>,
      required: false
    }
  },
  setup(props) {
    const commentList = reactive<IComment[]>(props.post.comments ?? []);
    const {
      deleteComment,
      getSelectedComment,
      addComment,
      updateComment
    } = useComment();

    return {
      commentList,
      getSelectedComment,
      deleteComment,
      addComment,
      updateComment
    };
  }
});
</script>

<style lang="scss" scoped></style>
