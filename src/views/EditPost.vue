<template>
  <div class="edit-post-panel">
    <router-link v-slot="{ navigate }" :to="goToFeed">
      <div class="tab" @click="navigate">
        Cancel
      </div>
    </router-link>
    <post-form
      :message-to-edit="message"
      :postItem="storePosts[postIndex]"
      :post-list="storePosts"
      :id="id"
    ></post-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
import PostForm from "@/components/PostForm.vue";
import { useStore } from "@/composables/use-store";
export default defineComponent({
  name: "edit-post",
  components: { PostForm },
  props: ["postList", "id", "post"],
  setup(props, { root }) {
    const { storePosts, getIndex } = useStore();
    const postIndex = getIndex(props.id);
    const goToFeed = computed(() => ({
      name: root.$routeNames.FEED,
      params: { id: props.id }
    }));
    const message = ref(storePosts[postIndex.value].message);

    return {
      message,
      goToFeed,
      storePosts,
      postIndex
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
