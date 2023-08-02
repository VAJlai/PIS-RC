<template>
  <!-- 侧面导航栏 -->
  <el-card shadow="never" class="maxbox" style="padding: 0 14%">
    <el-row class="tac" style="border: 0">
      <div class="changebox">
        <el-col :span="3" :offset="2">
          <div class="searchBar">
            <el-menu
              style="border: 0; z-index: 99; margin-top: 4rem"
              background-color="#2878EB00"
              active-background-color="#2878EB00"
              text-color="#fff"
              active-text-color="#fff"
              :default-active="nowRoute"
              mode="vertical"
              router
              :ellipsis="false"
            >
              <el-sub-menu open="" close="" index="">
                <template #title>{{ searchName }}</template>
                <el-menu-item
                  index="easy_search"
                  @click="closeMenu('easy_search')"
                  >基础检索</el-menu-item
                >
                <el-menu-item
                  index="basic_search"
                  @click="closeMenu('basic_search')"
                  >高级检索</el-menu-item
                >
                <el-menu-item
                  index="professional_search"
                  @click="closeMenu('professional_search')"
                  >专业检索</el-menu-item
                >
              </el-sub-menu>
              <!-- <el-menu-item index="easy_search" style="height: 20px">
                <el-icon>
                  <Search />
                </el-icon>
                <span style="font-size: middle">基础检索</span>
              </el-menu-item>
              <el-menu-item index="basic_search" style="height: 20px">
                <el-icon>
                  <Menu />
                </el-icon>
                <span style="font-size: middle">高级检索</span>
              </el-menu-item>

              <el-menu-item index="professional_search" style="height: 20px">
                <el-icon>
                  <Grid />
                </el-icon>
                <span style="font-size: middle">专业检索</span>
              </el-menu-item> -->
            </el-menu>
          </div>
        </el-col>
      </div>

      <el-col :span="24" class="searchForm">
        <router-view />
        <RankList />
      </el-col>
    </el-row>
  </el-card>
</template>


<style scoped>
.maxbox {
  /* padding: 3% 14%; */
}
.maxbox ::v-deep .el-card__body {
  /*margin-bottom: 20px;*/
  padding-top: 0px;
  /*background: #2878eb;*/
}
.maxbox {
  /*background: rgba(16, 15, 15, 0);*/
  /* background: linear-gradient(to bottom, #2878eb 48vh, white 25%, white 100%); */
  border: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

::v-deep .el-card {
  width: 100%;
  border-radius: 0px;
  border: 0px;
}
.tac {
  /*background: white;*/
}
.changebox {
  width: 100%;
  position: absolute;
  left: -30px;
  height: 13rem;
}

.el-menu-item.is-active {
  background-color: #2878eb00 !important;
  color: #fff;
}
.el-menu-item:hover {
  background-color: #2878eb00 !important;
  color: rgb(189, 184, 184);
}
.el-menu-item,
::v-deep .el-sub-menu .el-sub-menu__title {
  color: #fff;
  font-size: 18px;
}
.el-menu-item,
::v-deep .el-sub-menu.el-menu-item .is-active{
  font-size: 16px;
}
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-sub-menu__title {
  color: #fff !important;
}
</style>

<script lang='ts'>
import { ref, reactive, onMounted } from "vue";

import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    // 刷新页面后 根据路由调整选定导航栏
    const nowRoute = ref(router.currentRoute.value.path.split("/")[2]);
    console.log(nowRoute);

    let searchName = "";
    if (nowRoute.value == "easy_search") {
      searchName = "基础检索";
    }
    if (nowRoute.value == "basic_search") {
      searchName = "高级检索";
    }
    if (nowRoute.value == "professional_search") {
      searchName = "专业检索";
    }
    class SearchResult {
      Abstract: string;
      Author: string[];
      AuthorUnit: string;
      Keyword: string;
      PaperDatabase: string;
      PaperID: number;
      PaperSource: string;
      Press: string;
      PublishTime: string;
      Suffix: string;
      Theme: string;
      Title: string;
      Views: number;
    }

    // 检索结果
    const searchResults = reactive<{
      values: SearchResult[];
      pageInfo: {
        limit: number;
        page: number;
        total: number;
        loading: boolean;
      };
    }>({
      values: [],
      pageInfo: {
        limit: 10,
        page: 1,
        total: 0,
        loading: false,
      },
    });

    const routerIndex = reactive({
      easySearch:
        "easy_search?page=" +
        searchResults.pageInfo.page +
        "&limit=" +
        searchResults.pageInfo.limit,
      basicSearch:
        "basic_search?page=" +
        searchResults.pageInfo.page +
        "&limit=" +
        searchResults.pageInfo.limit,
      professionalSearch:
        "professional_search?page=" +
        searchResults.pageInfo.page +
        "&limit=" +
        searchResults.pageInfo.limit,
    });

    function closeMenu(index) {
      if (index == "easy_search") {
        this.searchName = "基础检索";
      }
      if (index == "basic_search") {
        this.searchName = "高级检索";
      }
      if (index == "professional_search") {
        this.searchName = "专业检索";
      }
    }

    return {
      nowRoute,
      searchResults,
      routerIndex,
      searchName,
      closeMenu,
    };
  },
};
</script>