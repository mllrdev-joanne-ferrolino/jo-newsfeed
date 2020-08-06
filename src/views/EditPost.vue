<template>
  <div class="edit-post-panel">
    <router-link v-slot="{ navigate }" :to="{ name: 'Feed' }">
      <div class="tab" @click="navigate">
        Cancel
      </div>
    </router-link>
    <post-form
      :message-to-edit="message"
      :id="postId"
      :obj="posts[getIndex(id)]"
      :post-list="posts"
    ></post-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import PostForm from "@/components/PostForm.vue";
import { Post } from "../models/post";
export default defineComponent({
  name: "edit-post",
  components: { PostForm },
  props: ["postList", "id", "post"],
  setup(props) {
    const posts = reactive(props.postList);
    const postId = props.id;
    function getIndex(id: number) {
      return posts.map((e: Post) => e.id).indexOf(id);
    }

    const message = reactive(posts[getIndex(props.id)].message);

    return { posts, message, postId, getIndex };
  }
});
</script>

<style lang="scss" scoped>
.edit-post-panel {
  background-color: white;
  border-radius: 15px;
  width: 80%;
  margin: auto;
  box-shadow: 5px 10px 20px #888888;
  .tab {
    padding-top: 15px;
  }
}
</style>
