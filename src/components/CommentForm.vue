<template>
  <div>
    <form @submit.prevent="handleComment" class="form">
      <textarea
        class="form-control"
        placeholder="Add comment"
        v-model="textComment"
      ></textarea>
      <span>
        <input class="btn btn-primary" type="submit" :value="label" />
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
  onMounted
} from "@vue/composition-api";
import { useComment } from "@/composables/use-comment";

export default defineComponent({
  name: "comment-form",
  props: ["message", "post"],
  setup(props) {
    const textComment = ref("");
    const isEmpty = ref(false);
    const commentList = reactive(props.post.comments);
    const commentId = ref(0);
    const label = ref("Comment");
    const { addComment } = useComment();
    onMounted(() => {
      if (props.post.comments.length) {
        commentId.value = commentList[commentList.length - 1].id;
      }
    });
    function handleComment() {
      if (!textComment.value) {
        isEmpty.value = true;
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
        isEmpty.value = false;
      }
    }

    return {
      handleComment,
      textComment,
      isEmpty,
      commentList,
      commentId,
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
      float: right;
    }
  }
}
</style>
