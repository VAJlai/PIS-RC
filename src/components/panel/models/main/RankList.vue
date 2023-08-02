<template>
    <div>
        <el-row style="padding: 0">
            <el-col class="el-col" :span="17">
              <div class="title">平台介绍</div>
                <el-card class="card" shadow="" style="font-size: 12px;padding: 20px;">
                    &emsp; 《新兴技术风险治理研究数据库》于2021年4月开始构思、创设，致力于推动新兴技术风险治理研究和发展。
                    <br><br>
                    &emsp; 主要针对医学领域（微针技术、虚拟病人、数字医学和全基因组合成技术等）、环保领域（太阳能化学技术、电动航空、低碳水泥和绿色氢气技术等）、空间计算和量子传感等领域发展中的热点、重点、发展趋势以及政策导向等进行动态跟踪、情报收集与研究分析，所用信息资源以权威的各信息资源为基础，其中包括权威政府网站、合作期刊等公开媒体资源和国内外知名研究机构、众多经济学家和学者的相关研究成果，由研究员精心收集、筛选、整合、加工，力求全方位、多视角、深层次地记录并探究新兴技术风险发展态势与治理效果，是借助先进的信息技术所建立的专业全文数据库。
                </el-card>
            </el-col>
            <el-col class="el-col" :span="6">
              <div class="title">积分榜单</div>
                <el-card class="card" shadow="" style="font-size: 12px;padding: 20px;">
                    <a href="">1</a>
                    <br>
                    <a href="">2</a>
                    <br>
                    <a href="">3</a>
                    <br>
                    <a href="">4</a>
                    <br>
                    <a href="">5</a>
                    <br>
                    <a href="">6</a>
                    <br>
                    <a href="">7</a>
                    <br>
                    <a href="">8</a>
                    <br>
                    <a href="">9</a>
                    <br>
                    <a href="">10</a>
                    <br>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
  .el-row {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .el-col {
    /*background: #a0cfff;*/
    /*padding: 5px;*/
    margin-bottom: 25px;
    border: 1px solid rgba(0,0,0,.15);
    border-top: 5px solid #7dacf0;
    border-radius: 8px;
    /*box-shadow: 0 2px 6px rgba(0,0,0,.15);*/
    /*-webkit-box-shadow: 2px 2px 6px rgba(0,0,0,.15);*/
  }

  .el-col:hover{
    border-top: 5px solid #FF9C00;
  }

  /*::v-deep .el-card__body {*/
  /*  !*margin: 0;*!*/
  /*  !*border-radius: 10px;*!*/
  /*  !*border-top: 0;*!*/
  /*}*/

  .card ::v-deep .el-card__body{
    margin: 0;
    border-radius: 10px;
    border-top: 0;
    /*box-shadow: 0 2px 6px rgba(0,0,0,.15);*/
    /*-webkit-box-shadow: 0 2px 6px rgba(0,0,0,.15);*/
  }

  .title {
    padding: 20px 0 0px 28px;
    color: #2878EB;
    font-size: 18px;
    font-weight: 600;
    /*border-bottom: 2px solid rgb(176, 176, 176, 0.14);*/
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