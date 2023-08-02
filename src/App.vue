<template>
  <div class="app">
    <router-view></router-view>
    <Foot />
  </div>
</template>

<script>
import Foot from '@/components/panel/Foot.vue'

export default {
  name: 'App',
  components: {
    Foot
  }
}
</script>
<style scoped>
.app{
width: 100vw;
  margin: 0;
  padding: 0;
  border: 0;
}
</style>