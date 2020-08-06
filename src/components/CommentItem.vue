<template>
  <div class="add-comment">
    <div class="comment">
      <div class="message">
        Commented {{ comment.date }} -
        {{ comment.message }}
      </div>
      <div class="edit" v-if="comment.isSelected">
        <textarea class="form-control" v-model="commentToEdit" />
        <button class="btn btn-primary" @click="updateComment(index)">
          Update
        </button>
        <button
          class="btn btn-primary"
          @click="comment.isSelected = !comment.isSelected"
        >
          Cancel
        </button>
        <div v-if="isEmpty">Please fill up comment.</div>
      </div>

      <span class="buttons" v-if="!comment.isSelected">
        <button class="btn btn-primary btn-sm" @click="editComment(index)">
          Edit
        </button>
        <button class="btn btn-primary btn-sm" @click="deleteComment(index)">
          Delete
        </button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "@vue/composition-api";
import { Comment } from "@/models/comment";
import CommentForm from "@/components/CommentForm.vue";

export default defineComponent({
  name: "comment-item",
  components: {
    CommentForm
  },
  props: ["post", "comment", "index"],
  setup(props) {
    const commentList: Comment[] = reactive(props.post.comments);
    const textComment = ref("");
    const commentToEdit = ref("");
    const isEmpty = ref(false);

    function deleteComment(index: number) {
      commentList.splice(index, 1);
    }

    function editComment(index: number) {
      commentList[index].isSelected = true;
      commentToEdit.value = commentList[index].message;
    }

    function updateComment(index: number) {
      if (!commentToEdit.value) {
        isEmpty.value = true;
      } else {
        const newComment = commentList[index];
        newComment.message = commentToEdit.value;
        newComment.date = new Date().toLocaleString();
        newComment.isSelected = false;
        isEmpty.value = false;
      }
    }

    return {
      commentList,
      textComment,
      deleteComment,
      editComment,
      updateComment,
      commentToEdit,
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
