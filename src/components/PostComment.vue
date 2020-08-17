<template>
  <div>
    <comment-item
      v-for="(comment, index) in commentList"
      :key="comment.id"
      :index="index"
      :comment="comment"
      @index="getSelectedComment(comment.postId, index)"
      @comment="deleteSelectedComment(comment.postId, index)"
      @values="updateSelectedComment"
    ></comment-item>
    <comment-form
      class="add-comment"
      :postId="post.id"
      @values="addCommentToList"
    ></comment-form>
    <modal v-show="isModalVisible" @close="isModalVisible = false">
      <template v-slot:body>
        {{ action }}
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref } from "@vue/composition-api";
import CommentItem from "@/components/CommentItem.vue";
import CommentForm from "@/components/CommentForm.vue";
import { IPost } from "@/models/post";
import { IComment } from "@/models/comment";
import { useComment } from "@/composables/use-comment";
import Modal from "@/components/Modal.vue";
import { AlertMessage } from "@/enums/alert-messages.enum";

export default defineComponent({
  name: "post-comment",
  components: {
    CommentItem,
    CommentForm,
    Modal
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
    const isModalVisible = ref(false);
    const action = ref("");
    const {
      deleteComment,
      getSelectedComment,
      addComment,
      updateComment
    } = useComment();

    function deleteSelectedComment(postId: number, index: number) {
      isModalVisible.value = true;
      action.value = deleteComment(postId, index)
        ? AlertMessage.COMMENT_DELETE_SUCCESS
        : AlertMessage.COMMENT_DELETE_FAIL;
    }

    function addCommentToList(values: any) {
      isModalVisible.value = true;
      action.value = addComment(values)
        ? AlertMessage.COMMENT_ADD_SUCCESS
        : AlertMessage.COMMENT_ADD_FAIL;
    }

    function updateSelectedComment(values: any) {
      isModalVisible.value = true;
      action.value = updateComment(values)
        ? AlertMessage.COMMENT_UPDATE_SUCCESS
        : AlertMessage.COMMENT_UPDATE_FAIL;
    }
    return {
      commentList,
      getSelectedComment,
      deleteSelectedComment,
      addCommentToList,
      updateSelectedComment,
      isModalVisible,
      action
    };
  }
});
</script>

<style lang="scss" scoped></style>
