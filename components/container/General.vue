<template>
  <div class="Gengral">
    <div class="header">
      <span class="title">{{ title }}</span>
      <slot name="tool"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'General',
  props: {
    title: String,
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  line-height: 34px;
  margin-bottom: 10px;
}
.title {
  font-size: 20px;
  padding: 0 10px;
  font-weight: 800;
  color: orange;
}
.tool-slot {
  flex: 1;
}
.Gengral {
  margin-bottom: 50px;
  /* background-color: #111; */
}
</style>
