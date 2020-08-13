<template>
  <div class="panel">
    <form @submit.prevent="handlePost">
      <div v-if="isEmpty">Please fill up message.</div>
      <span
        ><textarea
          class="form-control"
          v-model="message"
          placeholder="What's on your mind?"
        ></textarea
      ></span>
      <div>
        <input
          class="btn btn-primary"
          type="submit"
          :value="messageToEdit ? Label.UPDATE : Label.POST"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  PropType
} from "@vue/composition-api";
import router from "../router";
import { IPost } from "@/models/post";
import { usePost } from "@/composables/use-post";

export default defineComponent({
  name: "post-form",
  props: {
    messageToEdit: {
      type: String,
      required: false
    },
    id: {
      type: Number,
      required: false
    },
    postItem: {
      type: Object as PropType<IPost>,
      required: false
    }
  },
  setup(props, { root }) {
    const message = ref("");
    const isEmpty = ref(false);
    const { addPost, updatePost, Label } = usePost();

    onMounted(() => {
      if (props.messageToEdit) {
        message.value = props.messageToEdit;
      }
    });
    function handlePost() {
      if (!message.value) {
        isEmpty.value = true;
      } else {
        if (props.id) {
          updatePost(message.value, props.postItem?.comments ?? []);
          router.push({ name: root.$routeNames.FEED });
        } else {
          addPost(message.value);
        }
        isEmpty.value = false;
        message.value = "";
      }
    }

    return {
      handlePost,
      message,
      isEmpty,
      Label
    };
  }
});
</script>

<style lang="scss" scoped>
.panel {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  textarea {
    width: 80%;
    margin: auto;
    margin-bottom: 10px;
  }
}
</style>
