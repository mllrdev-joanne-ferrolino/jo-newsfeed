<template>
  <div>
    <div class="container">
      <post-form :post-list="posts"></post-form>
      <div class="panel">
        <div class="post" v-if="!posts.length">
          <span>There are no posts.</span>
        </div>
      </div>
      <div>
        <post-item
          v-for="(post, index) in posts"
          :key="post.id"
          :post="post"
          :id="index"
          :post-list="posts"
        ></post-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PostItem from "@/components/PostItem.vue";
import PostForm from "@/components/PostForm.vue";
import { defineComponent, reactive } from "@vue/composition-api";

export default defineComponent({
  name: "Feed",
  components: {
    PostItem,
    PostForm
  },
  props: ["postList"],
  setup(props) {
    const posts = reactive(props.postList);
    return { posts };
  }
});
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
  padding: 14px;

  .panel {
    background-color: white;
    border-radius: 15px;
    .post {
      margin-top: 10px;
      border-radius: 15px;
      height: 10vh;
      text-align: middle;
      line-height: 10vh;
      box-shadow: 5px 10px 20px #888888;
      span {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
      }
    }
  }
}

@media screen and (min-width: 320px) {
  .container {
    min-width: 625px;
  }
}
</style>
