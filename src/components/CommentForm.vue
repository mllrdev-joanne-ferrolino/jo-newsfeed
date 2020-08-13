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
          :value="message ? Label.UPDATE : Label.COMMENT"
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
  reactive,
  onMounted,
  PropType
} from "@vue/composition-api";
import { useComment } from "@/composables/use-comment";
import { IPost } from "@/models/post";
import { IComment } from "@/models/comment";
export default defineComponent({
  name: "comment-form",
  props: {
    message: {
      type: String
    },
    post: {
      type: Object as PropType<IPost>,
      required: true
    },
    comment: {
      type: Object as PropType<IComment>,
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
      default: 0
    }
  },
  setup(props) {
    const textComment = ref("");
    const isEmpty = ref(false);
    const commentList = reactive<IComment[]>(props.post.comments ?? []);
    const commentId = ref(0);
    const { addComment, updateComment, Label } = useComment();
    onMounted(() => {
      if (commentList.length) {
        commentId.value = commentList[commentList.length - 1].id;
      }
      if (props.message) {
        textComment.value = props.message;
      }
    });
    function handleComment() {
      if (!textComment.value) {
        isEmpty.value = true;
      } else {
        if (props.message) {
          updateComment(props.comment.postId, textComment.value, props.index);
        } else {
          // const comment: IComment = {
          //   id: commentId.value + 1,
          //   postId: props.post.id,
          //   message: textComment.value,
          //   date: new Date().toLocaleString(),
          //   isSelected: false,
          // };
          // addComment(comment);
          addComment(commentId.value + 1, props.post.id, textComment.value);
          commentId.value++;
          textComment.value = "";
        }
        isEmpty.value = false;
      }
    }

    return {
      handleComment,
      textComment,
      isEmpty,
      commentList,
      commentId,
      Label
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
