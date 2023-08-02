<template>
  <div class="block text-center upCard" m="t-4">
    <el-row>
      <el-col :span="8">
        <el-card shadow="never">
          <h3 class="small justify-center title" text="2xl">{{ promptInfo.easySearch.title }}</h3>
          <div class="cardInfo" v-html="promptInfo.easySearch.info"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <h3 class="small justify-center title" text="2xl">{{ promptInfo.basicSearch.title }}</h3>
          <div class="cardInfo" v-html="promptInfo.basicSearch.info"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <h3 class="small justify-center title" text="2xl">{{ promptInfo.professionalSearch.title }}</h3>
          <div class="cardInfo" v-html="promptInfo.professionalSearch.info"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}


.el-card {
  height: 90%;
  margin-right: 1vh;
}

.title {
  color: rgb(249, 139, 54);
}

.cardInfo {
  font-size: small;
}
</style>

<script lang='ts'>
import { reactive } from '@vue/reactivity'

export default {
  name: 'UpCard',
  setup() {
    const promptInfo = reactive({
      easySearch: {
        title: '简单检索使用方法：',
        info: '在检索框输入想搜索的关键字,系统将会自动搜索所有检索项包含该词的相关资料<br/>如果不确定搜索目标则条件越少越好'
      },
      basicSearch: {
        title: '基础检索使用方法：',
        info: '1. 选择相关资料库<br/>选择查找的检索项,例:主题,在搜索框输入该检索项匹配的关键词,点击加号可增加多条检索条件,条件分别有AND OR NOT。'
      },
      professionalSearch: {
        title: '专业检索使用方法：',
        info: "专业搜索暂时无法保证准确性,将会在之后的版本进行调整<br/>可检索字段:SU%=主题,TKA=篇关摘,KY=关键词,TI=篇名,AU=作者,,AF=作者单位,LY=文献来源<br/>例: SU='北京' and KY='环境保护' 可以检索到主题包括“北京”及关键词包括环境保护的相关信息"
      }
    })
    return {
      promptInfo
    }
  }
}

</script>