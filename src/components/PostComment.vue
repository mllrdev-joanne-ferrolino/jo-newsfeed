<template>
  <div>
    <comment-item
      v-for="(comment, index) in commentList"
      :key="comment.id"
      :index="index"
      :comment="comment"
      :post="post"
    ></comment-item>
    <comment-form :post="post"></comment-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from "@vue/composition-api";
import CommentItem from "@/components/CommentItem.vue";
import CommentForm from "@/components/CommentForm.vue";
import { Post } from "@/models/post";

export default defineComponent({
  name: "post-comment",
  components: {
    CommentItem,
    CommentForm
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
  setup(props) {
    const commentList = reactive(props.post.comments ?? []);
    return { commentList };
  }
});
</script>

<style lang="scss" scoped></style>
