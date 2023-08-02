<template>
    <el-card class="card" shaow="never">
        <p>如何成为会员</p>
        <p>如何上传文献</p>
        <p>如何下载资源</p>
    </el-card>
</template>

<style scoped>
.card {
  background: linear-gradient(to bottom, #2878eb 48vh, white 48vh, white 100%);
  border: 0;
  box-shadow: none;
}
::v-deep .el-card__body {
  margin: 3% 14%;
  /*padding: 0px;*/
  background: white;
}
</style>

<script lang='ts'>
export default {
    setup() {
        return {
        }
    }
}

</script>