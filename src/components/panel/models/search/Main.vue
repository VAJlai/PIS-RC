<template>
  <div class="common-layout">
    <RightMain />
  </div>
</template>

<style scoped>
</style>

<script>
import RightMain from '../main/RightMain.vue'
import RankList from '../main/RankList.vue'


export default {

  components: {
    RightMain,
    RankList
  },
  name: 'Main',
  setup() {
  }
}

</script>