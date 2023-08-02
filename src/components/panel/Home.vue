<template>
  <el-container class="box">
    <el-header>
      <Head class="head"/>
    </el-header>
    <el-main>
      <el-col>
        <router-view></router-view>
      </el-col>
    </el-main>
  </el-container>
</template>


<style scoped>
.box {
  min-height: 1200px;
  /* background: #2878EB; */
  background: linear-gradient(to bottom, #2878EB 0%, #2878EB 54.8vh, white 54.8vh, white 100%);
}
</style>

<script lang='ts'>
import Head from './Head.vue'
export default {
  components: {
    Head,
  },
  /* 使用vue3的composition API */
  setup() {

  }
}
</script>

<style scoped>
.el-header{
  width: 100vw;
  height: 8vh;
  padding: 0;
  margin: 0;
  border: 0;
  background: #2878EB;
}

.el-main {
  width: 100vw;
  padding: 0;
  position: relative;
}
.head {
  background: #2878EB;
}
</style>