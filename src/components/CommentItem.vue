<template>
  <div class="add-comment">
    <div class="comment">
      <div class="message">
        <p style="">
          Commented {{ comment.date }}
          {{ comment.message }}
        </p>
      </div>
      <comment-form
        class="edit-comment"
        v-if="comment.isSelected"
        :message="textComment"
        :comment="comment"
        :index="index"
        :postId="comment.postId"
        @updateParams="updateComment"
      ></comment-form>

      <span class="buttons" v-if="!comment.isSelected">
        <button class="btn btn-primary btn-sm" @click="selectComment(index)">
          Edit
        </button>
        <button
          class="btn btn-primary btn-sm"
          @click="$emit('comment', comment)"
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
import { IUseCommentUpdateParams } from "@/models/useCommentUpdateParams";

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
    },
    values: {
      type: Object as PropType<IUseCommentUpdateParams>
    }
  },
  setup(props, { emit }) {
    const textComment = ref("");
    const isEmpty = ref(false);

    function selectComment(index: number) {
      textComment.value = props.comment.message;
      emit("index", index);
    }
    function updateComment(values: IUseCommentUpdateParams) {
      emit("updateParams", values);
    }
    return {
      selectComment,
      textComment,
      isEmpty,
      updateComment
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
      p {
        margin: auto;
        width: 70vw;
      }
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
