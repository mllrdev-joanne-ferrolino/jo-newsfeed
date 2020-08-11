<template>
  <div class="panel">
    <div class="post">
      <div class="edit">
        <span>
          <router-link v-slot="{ navigate }" :to="goToEditPage">
            <span
              ><button class="btn btn-primary" @click="navigate">
                Edit
              </button></span
            >
          </router-link>
        </span>
        <span
          ><button class="btn btn-primary" @click="deletePost(post.id)">
            Delete
          </button></span
        >
      </div>
      <p>
        <span class="date">Posted {{ post.date }}</span>
      </p>
      <p>{{ post.message }}</p>
      <post-comment :post="post"></post-comment>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  PropType
} from "@vue/composition-api";
import CommentItem from "@/components/CommentItem.vue";
import CommentForm from "@/components/CommentForm.vue";
import PostComment from "@/components/PostComment.vue";
import { Comment } from "@/models/comment";
import { Post } from "@/models/post";
import { useStore } from "@/composables/use-store";

export default defineComponent({
  name: "post-item",
  components: {
    CommentItem,
    CommentForm,
    PostComment
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  setup(props, { root }) {
    const { deletePost } = useStore();
    const commentList = reactive<Comment[]>(props.post.comments ?? []);
    const goToEditPage = computed(() => ({
      name: root.$routeNames.EDIT_POST,
      params: { id: props.post.id }
    }));

    return {
      deletePost,
      commentList,
      goToEditPage
    };
  }
});
</script>

<style lang="scss" scoped>
.row {
  padding: 14px;
  .col {
    padding: 2px;
  }
  .panel {
    background-color: white;
    border-radius: 15px;
    box-shadow: 5px 10px 20px #888888;
  }

  textarea {
    width: 80%;
    margin: auto;
  }
  .post {
    padding: 20px;
    text-align: left;
    .date {
      text-align: right;
      font-size: 14px;
    }
    .edit {
      float: right;
      span {
        margin-left: 5px;
      }
    }
    .add-comment {
      margin-left: 10px;
      margin-top: 10px;
    }
  }
}
</style>
