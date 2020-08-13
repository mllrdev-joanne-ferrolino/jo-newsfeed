<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Home"
});
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
  background-color: gray;
  padding: 10px;
  .panel {
    background-color: white;
    border-radius: 2px;
  }
}
textarea {
  width: 80%;
  margin: auto;
}
.post {
  border: 1px solid black;
  padding: 5px;
  text-align: left;
  .date {
    text-align: right;
    font-size: 10px;
  }
}
</style>
