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
          :value="messageToEdit ? label.UPDATE : label.POST"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  onMounted
} from "@vue/composition-api";
import { IPost } from "@/models/post";
import { PostLabel } from "@/enums/post-label.enum";
import { IUsePostUpdateParams } from "@/models/usePostUpdateParams";

export default defineComponent({
  name: "post-form",
  props: {
    messageToEdit: {
      type: String,
      required: false
    },
    postItem: {
      type: Object as PropType<IPost>,
      required: false,
      default: () => ({
        index: 0,
        id: 0,
        comments: [],
        message: "",
        date: ""
      })
    },
    values: {
      type: Object as PropType<IUsePostUpdateParams>
    }
  },
  setup(props, { emit }) {
    const message = ref("");
    const isEmpty = ref(false);
    const label = PostLabel;

    onMounted(() => {
      if (props.messageToEdit) {
        message.value = props.messageToEdit;
      }
    });
    function handlePost() {
      if (!message.value) {
        isEmpty.value = true;
      } else {
        if (props.postItem.id) {
          emit("values", {
            id: props.postItem.id,
            message: message.value,
            comments: props.postItem.comments
          });
        } else {
          emit("message", message.value);
        }
        isEmpty.value = false;
        message.value = "";
      }
    }

    return {
      handlePost,
      message,
      isEmpty,
      label
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
