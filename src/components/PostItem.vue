<template>
  <div class="panel">
    <div class="post">
      <div class="edit">
        <span>
          <router-link v-slot="{ navigate }" :to="goToEditPage">
            <button class="btn btn-primary" @click="navigate">
              Edit
            </button>
          </router-link>
        </span>
        <span
          ><button class="btn btn-primary" @click="$emit('post', post)">
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
import { defineComponent, computed, PropType } from "@vue/composition-api";
import PostComment from "@/components/PostComment.vue";
import { IPost } from "@/models/post";

export default defineComponent({
  name: "post-item",
  components: {
    PostComment
  },
  props: {
    post: {
      type: Object as PropType<IPost>,
      required: true
    }
  },
  setup(props, { root }) {
    const goToEditPage = computed(() => ({
      name: root.$routeNames.EDIT_POST,
      params: { id: props.post.id }
    }));

    return {
      goToEditPage
    };
  }
});
</script>

<style lang="scss" scoped>
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
  margin-top: 10px;
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
</style>
