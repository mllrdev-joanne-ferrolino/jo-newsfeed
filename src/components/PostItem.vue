<template>
  <div class="row">
    <div class="col">
      <div class="panel">
        <div class="post">
          <div class="edit">
            <span>
              <router-link
                v-slot="{ navigate }"
                :to="{ name: 'Edit', params: { id: post.id } }"
              >
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
          <comment-item
            v-for="(comment, index) in post.comments"
            :key="comment.id"
            :post="post"
            :comment="comment"
            :index="index"
          ></comment-item>
          <comment-form :post="post"></comment-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import CommentItem from "@/components/CommentItem.vue";
import CommentForm from "@/components/CommentForm.vue";
import { Comment } from "@/models/comment";
import { Post } from "@/models/post";
export default defineComponent({
  name: "post-item",
  components: {
    CommentItem,
    CommentForm
  },
  props: ["post", "id", "postList"],
  setup(props) {
    const commentList: Comment[] = reactive(props.post.comments);
    const posts: Post[] = reactive(props.postList);

    function deletePost(id: number) {
      posts.splice(posts.indexOf(posts.find((e: Post) => e.id === id)!), 1);
    }

    return {
      deletePost,
      commentList
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
