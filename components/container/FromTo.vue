<template>
  <div class="from-to">
    <div>
      <div>{{fromKey}}</div>
      <div>{{fromValue}}</div>
    </div>
    <slot></slot>
    <div>
      <div>{{toKey}}</div>
      <div>{{toValue}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fromKey: 'from',
    fromValue: '',
    toKey: 'to',
    toValue: '',
  },
}
</script>

<style scoped>
.from-to {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76px;
  background-color: rgb(245, 235, 235);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.from-to:hover {
  box-shadow: 5px 5px 15px #ccc;
}
</style>