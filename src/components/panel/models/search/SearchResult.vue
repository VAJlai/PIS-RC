<template>
  <div class="box-group">
    <el-card class="card1" shadow="never" style="width: 100%;border-radius: 8px;height: auto;">
      <div class="title" style="padding-top: 1rem;">检索信息</div>
      <el-table :data="props.searchInfo.res"
                size="medium"
                stripe style="width: 100%;font-size: 12px;padding: 12px">
        <el-table-column prop="title" label="篇名">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <router-link :to="`/article?id=` + scope.row.ID" style="text-decoration : none;">
                {{ scope.row.title }}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="180px">
        </el-table-column>
        <el-table-column prop="source" label="来源">
        </el-table-column>
        <el-table-column prop="publish_time" label="发布时间">
        </el-table-column>
        <el-table-column prop="database" label="数据库">
        </el-table-column>
      </el-table>

      <div class="example-pagination-block">
        <el-row>
          <el-col :span="8">

            <el-pagination v-model:currentPage="pagination.page" :page-size="pagination.limit"
                           layout="prev, pager, next" :total="props.searchInfo.total"
                           @current-change="handleCurrentChange"/>
          </el-col>
        </el-row>
      </div>
    </el-card>
<!--    <el-card class="card2" shadow="never" style="width: 35%;border-radius: 8px;">-->
<!--      <RankList />-->
<!--    </el-card>-->
  </div>
</template>

<style scoped>
.box-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -40px;
}

.box-group .card1 ::v-deep .el-card__body{
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,.15);
  -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.15);
  border: 1px solid rgba(0,0,0,.15);
}

.box-group .card2 ::v-deep .el-card__body{
  margin: 0;
  padding: 0;
  border-radius: 10px;
}

.box-group .card1, .box-group .card2 {
  border-top: 5px solid #7dacf0;
}

.box-group .card1:hover,  .box-group .card2:hover{
  border-top: 5px solid #FF9C00;
}


.title {
  padding: 0px 0 15px 8px;
  margin-bottom: 2px;
  color: #2878EB;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid rgb(176, 176, 176, 0.24);
  /*-webkit-box-shadow: 1px 1px 6px rgba(0,0,0,.15);*/
}

</style>

<script lang='ts' setup>

import {reactive, onMounted} from "vue";

const emit = defineEmits(["pageChange"])
const props = defineProps({
  searchInfo: {
    type: Object,
    default: {
      res: [],
      total: 0
    }
  },
})

// 分页回调
const handleCurrentChange = (val: number) => {
  pagination.page = val
  emit('pageChange', val)
}

// 分页信息
const pagination = reactive({
  total: 100,
  limit: 10,
  page: 1,
  loading: true
})


</script>