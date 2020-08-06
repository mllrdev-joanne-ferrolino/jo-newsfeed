<template>
  <div id="app">
    <div id="nav">
      <router-view :post-list="posts" @posts="handlePosts" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import { Post } from "@/models/post";
export default defineComponent({
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
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #dddfe2;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
