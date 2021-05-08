<template>
  <div class="wrapper">Template Component</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Template",
  props: {},
  setup: () => {},
});
</script>

<style scoped>
.wrapper {
  padding: 12px;
  border: 1px dashed #42b983;
}
</style>
