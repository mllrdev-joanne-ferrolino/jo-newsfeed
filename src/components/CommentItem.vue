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
        :message="commentToEdit"
        :post="post"
        :comment="comment"
        :index="index"
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
import { defineComponent, ref, reactive, PropType } from "@vue/composition-api";
import { IComment } from "@/models/comment";
import CommentForm from "@/components/CommentForm.vue";
import { useComment } from "@/composables/use-comment";
import { IPost } from "@/models/post";

export default defineComponent({
  name: "comment-item",
  components: {
    CommentForm
  },
  props: {
    post: {
      type: Object as PropType<IPost>,
      required: true
    },
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
    const commentList = reactive<IComment[]>(props.post?.comments ?? []);
    const textComment = ref("");
    const commentToEdit = ref("");
    const isEmpty = ref(false);
    const { deleteComment } = useComment();

    function selectComment(index: number) {
      commentList[index].isSelected = true;
      commentToEdit.value = commentList[index].message;
    }

    return {
      commentList,
      textComment,
      deleteComment,
      selectComment,
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
