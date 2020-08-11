<template>
  <div>
    <form @submit.prevent="handleComment" class="form">
      <textarea
        class="form-control"
        placeholder="Add comment"
        v-model="textComment"
      ></textarea>
      <span class="buttons">
        <input class="btn btn-primary btn-sm" type="submit" :value="label" />
        <input
          class="btn btn-primary btn-sm"
          v-if="isEditMode"
          @click="comment.isSelected = !comment.isSelected"
          value="Cancel"
          type="button"
        />
      </span>
      <div v-if="isEmpty">Please fill up comment.</div>
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
import { Post } from "@/models/post";
import { Comment } from "@/models/comment";
export default defineComponent({
  name: "comment-form",
  props: {
    message: {
      type: String
    },
    post: {
      type: Object as PropType<Post>,
      required: true
    },
    comment: {
      type: Object as PropType<Comment>
    }
  },
  setup(props) {
    const textComment = ref("");
    const isEmpty = ref(false);
    const commentList = reactive<Comment[]>(props.post.comments ?? []);
    const commentId = ref(0);
    const label = ref("Comment");
    const isEditMode = ref(false);
    const commentItem = reactive(
      props.comment ?? { message: "", date: "", isSelected: false }
    );
    const { addComment } = useComment();
    onMounted(() => {
      if (commentList.length) {
        commentId.value = commentList[commentList.length - 1].id;
      }
      if (props.message) {
        textComment.value = props.message;
        label.value = "Update";
        isEditMode.value = true;
      }
    });
    function handleComment() {
      if (!textComment.value) {
        isEmpty.value = true;
      } else {
        if (props.message) {
          commentItem.message = textComment.value;
          commentItem.date = new Date().toLocaleString();
          commentItem.isSelected = false;
        } else {
          const comment = {
            id: commentId.value + 1,
            postId: props.post.id,
            message: textComment.value,
            date: new Date().toLocaleString(),
            isSelected: false
          };
          addComment(comment);
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
      label,
      isEditMode,
      commentItem
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
