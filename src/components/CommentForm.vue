<template>
  <div class="form">
    <textarea
      class="form-control"
      placeholder="Add comment"
      v-model="textComment"
    ></textarea>
    <span>
      <button class="btn btn-primary" @click="addComment()">
        Comment
      </button>
    </span>
    <div v-if="isEmpty">Please fill up comment.</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted
} from "@vue/composition-api";

export default defineComponent({
  name: "comment-form",
  props: ["message", "post"],
  setup(props) {
    const textComment = ref("");
    const isEmpty = ref(false);
    const commentList = reactive(props.post.comments);
    const commentId = ref(0);
    onMounted(() => {
      if (props.post.comments.length) {
        commentId.value = commentList[commentList.length - 1].id;
      }
    });
    function addComment() {
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
        commentList.push(comment);
        commentId.value++;
        textComment.value = "";
        isEmpty.value = false;
      }
    }

    return {
      addComment,
      textComment,
      isEmpty,
      commentList,
      commentId
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
      display: inline-flex;
      margin-top: 5px;
    }
    span {
      float: right;
    }
  }
}
</style>
