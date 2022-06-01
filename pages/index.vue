<template>
  <div class="app-container">
    <h1 align="center">首页</h1>
    <t-editor></t-editor>
    <el-empty description="空空如也" :image-size="500"></el-empty>
  </div>
</template>

<script>
import scenic from "~/pages/scenic";
import TEditor from "@/components/TEditor";

export default {
  layout: 'default',
  name: 'IndexPage',
  components: {scenic, TEditor}
}
</script>
