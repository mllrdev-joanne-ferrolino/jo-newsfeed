<template>
  <div class="home">
    <router-link to="/feed">Navigate to Newsfeed</router-link>
    <router-view :post-list="posts" @posts="handlePosts" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import { Post } from "@/models/post";
export default defineComponent({
  name: "Home",
  setup() {
    const posts: Post[] = reactive([]);
    function handlePosts(postList: Post[]) {
      postList.forEach(element => {
        posts.push(element);
      });
    }
    return { posts, handlePosts };
  }
});
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
  background-color: gray;
  padding: 10px;
  .panel {
    background-color: white;
    border-radius: 2px;
  }
}
textarea {
  width: 80%;
  margin: auto;
}
.post {
  border: 1px solid black;
  padding: 5px;
  text-align: left;
  .date {
    text-align: right;
    font-size: 10px;
  }
}
</style>
