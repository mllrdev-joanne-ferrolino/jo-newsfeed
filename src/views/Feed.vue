<template>
  <div>
    <div class="container">
      <post-form @message="addToPostList"></post-form>
      <div class="panel">
        <div class="post" v-if="!storePosts.length">
          <span>There are no posts.</span>
        </div>

        <post-item
          v-for="post in storePosts"
          :key="post.id"
          :post="post"
          @post="deleteSelectedPost(post.id)"
        ></post-item>

        <modal v-show="isModalVisible" @close="isModalVisible = false">
          <template v-slot:body>
            {{ action }}
          </template>
        </modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PostItem from "@/components/PostItem.vue";
import PostForm from "@/components/PostForm.vue";
import { defineComponent, ref } from "@vue/composition-api";
import { useStore } from "@/composables/use-store";
import { usePost } from "@/composables/use-post";
import Modal from "@/components/Modal.vue";
import { AlertMessage } from "@/enums/alert-messages.enum";

export default defineComponent({
  name: "Feed",
  components: {
    PostItem,
    PostForm,
    Modal
  },
  setup() {
    const { storePosts } = useStore();
    const { deletePost, addPost } = usePost();
    const isModalVisible = ref(false);
    const action = ref("");

    function deleteSelectedPost(id: number) {
      isModalVisible.value = true;
      action.value = deletePost(id)
        ? AlertMessage.DELETE_SUCCESS
        : AlertMessage.DELETE_FAIL;
    }

    function addToPostList(message: string) {
      isModalVisible.value = true;
      action.value = addPost(message)
        ? AlertMessage.ADD_SUCCESS
        : AlertMessage.ADD_FAIL;
    }
    return {
      storePosts,
      deleteSelectedPost,
      addToPostList,
      isModalVisible,
      action
    };
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
