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
        <input class="btn btn-primary" type="submit" :value="editLabel" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  PropType
} from "@vue/composition-api";
import router from "../router";
import { Post } from "@/models/post";
import { useStore } from "@/composables/use-store";

export default defineComponent({
  name: "post-form",
  props: {
    messageToEdit: {
      type: String
    },
    id: {
      type: Number
    },
    postItem: {
      type: Object as PropType<Post>
    },
    postList: {
      type: Array as PropType<Post[]>,
      required: true
    }
  },
  setup(props, { emit, root }) {
    const message = ref("");
    const editLabel = ref("Post");
    const postItemId = ref(0);
    let post: Post = { index: 0, id: 0, message: "", date: "", comments: [] };
    const isEmpty = ref(false);
    const posts = reactive(props.postList);
    const { addPost, updatePost, getIndex } = useStore();

    onMounted(() => {
      if (props.messageToEdit) {
        message.value = props.messageToEdit;
        editLabel.value = "Update";
      }
      if (props.postList.length) {
        const posts = props.postList;
        postItemId.value = posts[posts.length - 1].id;
      }
    });
    function handlePost() {
      if (!message.value) {
        isEmpty.value = true;
      } else {
        if (props.id) {
          post.id = props.id;
          post.comments = props.postItem?.comments;
          post.message = message.value;
          post.date = new Date().toLocaleString();
          post.index = getIndex(props.id).value;
          updatePost(post);
          router.push({ name: root.$routeNames.FEED });
        } else {
          post = {
            index: 0,
            id: postItemId.value + 1,
            comments: [],
            message: message.value,
            date: new Date().toLocaleString()
          };
          addPost(post);
          postItemId.value++;
        }
        emit("postList", posts);
        isEmpty.value = false;
        message.value = "";
      }
    }

    return {
      handlePost,
      message,
      editLabel,
      post,
      postItemId,
      isEmpty
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
