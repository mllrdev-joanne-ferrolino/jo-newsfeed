<template>
  <div class="edit-post-panel">
    <router-link v-slot="{ navigate }" :to="goToFeed">
      <div class="tab" @click="navigate">
        Cancel
      </div>
    </router-link>
    <post-form
      :message-to-edit="message"
      :postItem="getPost(id)"
      @values="updateSelectedPost"
    ></post-form>
    <modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:body>{{ action }}</template>
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "@vue/composition-api";
import PostForm from "@/components/PostForm.vue";
import Modal from "@/components/Modal.vue";
import { usePost } from "@/composables/use-post";
import { AlertMessage } from "@/enums/alert-messages.enum";
import { IUsePostUpdateParams } from "@/models/usePostUpdateParams";
import router from "../router";

export default defineComponent({
  name: "edit-post",
  components: { PostForm, Modal },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props, { root }) {
    const { updatePost, getPost } = usePost();
    const goToFeed = computed(() => ({
      name: root.$routeNames.FEED,
      params: { id: props.id }
    }));
    const message = getPost(props.id).message;
    const isModalVisible = ref(false);
    const action = ref("");

    function updateSelectedPost(values: IUsePostUpdateParams) {
      isModalVisible.value = true;
      action.value = updatePost(values)
        ? AlertMessage.UPDATE_SUCCESS
        : AlertMessage.UPDATE_FAIL;
    }

    function closeModal() {
      isModalVisible.value = false;
      router.push({ name: root.$routeNames.FEED });
    }
    return {
      message,
      goToFeed,
      getPost,
      updateSelectedPost,
      isModalVisible,
      action,
      closeModal
    };
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
