<template>
  <div>
    {{ item }}
    <post-form></post-form>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
export default {
  name: "Post",
  props: ["item"],
  components: {
    PostForm
  }
};
</script>

<style lang="scss" scoped></style>
