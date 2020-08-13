<template>
  <div class="add-comment">
    <div class="comment">
      <div class="message">
        Commented {{ comment.date }} -
        {{ comment.message }}
      </div>
      <comment-form
        class="edit-comment"
        v-if="comment.isSelected"
        :message="textComment"
        :comment="comment"
        :index="index"
        :postId="comment.postId"
      ></comment-form>

      <span class="buttons" v-if="!comment.isSelected">
        <button class="btn btn-primary btn-sm" @click="selectComment(index)">
          Edit
        </button>
        <button
          class="btn btn-primary btn-sm"
          @click="deleteComment(comment.postId, index)"
        >
          Delete
        </button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "@vue/composition-api";
import { IComment } from "@/models/comment";
import CommentForm from "@/components/CommentForm.vue";
import { useComment } from "@/composables/use-comment";

export default defineComponent({
  name: "comment-item",
  components: {
    CommentForm
  },
  props: {
    comment: {
      type: Object as PropType<IComment>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const textComment = ref("");
    const isEmpty = ref(false);
    const { deleteComment, getSelectedComment } = useComment();

    function selectComment(index: number) {
      const commentItem = getSelectedComment(props.comment.postId, index);
      textComment.value = commentItem.message;
    }

    return {
      deleteComment,
      selectComment,
      textComment,
      isEmpty
    };
  }
});
</script>

<style lang="scss" scoped>
.add-comment {
  .comment {
    background-color: #ebedf0;
    border-radius: 10px;

    margin-bottom: 5px;
    .message {
      padding: 15px;
      width: 80%;
      display: inline-flex;
    }
    button {
      margin-left: 5px;
    }
    .edit {
      margin-top: 15px;
    }
  }
  textarea {
    width: 80%;
    display: inline-flex;
    margin-top: 5px;
  }
  span {
    float: right;
  }
}
</style>
