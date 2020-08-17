<template>
  <div>
    <div v-if="isEmpty">Please fill up comment.</div>
    <form @submit.prevent="handleComment" class="form">
      <textarea
        class="form-control"
        placeholder="Add comment"
        v-model="textComment"
      ></textarea>
      <span class="buttons">
        <input
          class="btn btn-primary btn-sm"
          type="submit"
          :value="message ? label.UPDATE : label.COMMENT"
        />
        <input
          class="btn btn-primary btn-sm"
          v-if="message"
          @click="comment.isSelected = !comment.isSelected"
          value="Cancel"
          type="button"
        />
      </span>
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  PropType
} from "@vue/composition-api";
import { IComment } from "@/models/comment";
import { CommentLabel } from "@/enums/comment-label.enum.ts";
import { IUseCommentUpdateParams } from "@/models/useCommentUpdateParams";
import { IUseCommentAddParams } from "@/models/useCommentAddParams";
export default defineComponent({
  name: "comment-form",
  props: {
    message: {
      type: String,
      required: false
    },
    comment: {
      type: Object as PropType<IComment>,
      required: false,
      default: () => ({
        id: 0,
        postId: 0,
        message: "",
        date: "",
        isSelected: false
      })
    },
    index: {
      type: Number,
      required: false,
      default: 0
    },
    postId: {
      type: Number,
      required: true
    },
    updateParams: {
      type: Object as PropType<IUseCommentUpdateParams>,
      required: false
    },
    addParams: {
      type: Object as PropType<IUseCommentAddParams>,
      required: false
    }
  },
  setup(props, { emit }) {
    const textComment = ref("");
    const isEmpty = ref(false);
    const label = CommentLabel;
    onMounted(() => {
      if (props.message) {
        textComment.value = props.message;
      }
    });
    function handleComment() {
      if (!textComment.value) {
        isEmpty.value = true;
      } else {
        if (props.message) {
          emit("updateParams", {
            postId: props.comment.postId,
            message: textComment.value,
            index: props.index
          });
        } else {
          emit("addParams", {
            postId: props.postId,
            message: textComment.value
          });
          textComment.value = "";
        }
        isEmpty.value = false;
      }
    }

    return {
      handleComment,
      textComment,
      isEmpty,
      label
    };
  }
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  gap: 10px;
  margin-left: 10px;
  .panel {
    padding: 10px;
    background-color: white;
    border-radius: 2px;
    textarea {
      width: 80%;
      display: inline-flex;
      margin-top: 5px;
    }
    span {
      .buttons {
        display: inline-flex;
      }
      float: right;
    }
  }
}
</style>
