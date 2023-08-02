<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="entirety-box">
          <div class="articleInfo">
            <span>
              <el-icon style="cursor: pointer" @click="back" :size="28">
                <Back />
              </el-icon>
            </span>

            <h5 class="publish-box">
              {{ article.info.publish_time }}上传
            </h5>

            <h1 align="center">{{ article.info.title }}</h1>

            <el-divider content-position="center" class="author-box">
              <h3 align="center" style="color:#5066b2;">
                <!-- <i v-for="item in article.info.Author"> {{ item }} &ensp; </i> -->
                {{ article.info.author }}
              </h3>
            </el-divider>

            <div class="content-box">
              <h4 align="center" style="margin-top: 28px; margin-bottom: 8vh;color:#5066b2;">
                {{ article.info.author_unit }}
              </h4>

              <span><b>摘要：</b>{{ article.info.abstract }}</span>

              <span><b>主题：</b>{{ article.info.theme }}</span>

              <span
                ><b>关键词：</b>
                <!-- <i v-for="item in article.info.keyword">{{ item }} &ensp;</i> -->
                {{ article.info.keyword }}
              </span>

              <span><b>ID：</b>{{ article.info.ID }}</span>

              <span><b>数据库：</b>{{ article.info.database }}</span>

              <span><b>出版社：</b>{{ article.info.press }}</span>

              <span class="download-box">
                <el-button link type="primary" @click="downloadArticle()"
                  >下载</el-button
                >
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.entirety-box {
  margin: 20px 12%;
  min-width: 800px;
}

.publish-box {
  text-align: right;
  font-size: 14px;
  color: rgb(54, 54, 54);
  font-weight: 400;
  margin-bottom: 6vh;
}

.articleInfo {
  padding: 1vw 16vh;
}

.author-box {
  margin-top: 5vh;
  color: #5066b2;
}

.articleInfo .content-box span {
  display: block;
  margin-top: 3vh;
  font-size: 1rem;
}
.download-box {
    line-height: 6rem;
    text-align: right;
}

.el-button {
  border-color: transparent;
  color: #fff;
  background-color: #2878eb;
  padding: 6px 2.3rem;
  height: 2.4rem;
  box-shadow: 2px 3px 6px #0a56c2;
}

.el-button.is-link:not(.is-disabled):focus,
.el-button.is-link:not(.is-disabled):hover {
  border-color: transparent;
  background-color: #0a56c2;
  color: #fff;
  box-shadow: 2px 3px 6px #0a56c2;
}
</style>

<script lang='ts'>
import { useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { PaperService } from "@/api/api";
import router from "../../../../router";
import FileSaver from 'file-saver';
import { flatMap } from "lodash";

export default {
  setup() {
    const route = useRoute();
    //query
    const articleId = ref(route.query.id);

    const article = reactive({
      info: {},
    });

    const parseTime = function (time: number) {
      var d = new Date(time);
      var res = "";
      res += d.getFullYear() + "年";
      res += d.getMonth() + 1 + "月";
      res += d.getDate() + "日\t";
      return res;
    };

    const back = function () {
      router.go(-1);
    };

    onMounted(() => {
      PaperService.paperFindByID(articleId.value).then((res: any) => {
        if (res.data.code == 200) {
          article.info = res.data.data;
        }
      });
    });
    
    const downloadArticle = function () {
      PaperService.paperDownload(article.info.ID)
        .then((response: any) => {
          var segments  = response.headers["content-disposition"].replace(
            'attachment;filename="',
            ""
          ).split('.');
          console.log(segments[segments.length - 1])
          const fileName =  article.info.title+'.'+segments[segments.length - 1];// 从响应头中获取文件名
          const blob = new Blob([response.data], { type: response.data.type });

    FileSaver.saveAs(blob, fileName); 
        // 保存文件到本地
        //   const link = document.createElement("a");
        //   let blob = new Blob([res.data], {
        //     type: res.headers["content-type"],
        //   });
        //   link.style.display = "none";
        //   link.href = URL.createObjectURL(blob);
        //   var filename = res.headers["content-disposition"].replace(
        //     'attachment;filename="',
        //     ""
        //   );
        //   link.setAttribute(
        //     "download",
        //     filename.substr(0, filename.length - 1)
        //   );
        //   document.body.appendChild(link);
        //   link.click();
        //   document.body.removeChild(link);
        // })
        // .catch(function () {
        //   ElMessage.error("原文件丢失或未上传，请联系管理员");
        });
    };

    return {
      articleId,
      article,
      downloadArticle,
      parseTime,
      back,
    };
  },
};
</script>