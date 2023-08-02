import {
  createWebHashHistory,
  createRouter
} from "vue-router";
// 登录注册组件
import Login from "@/components/loginAndRegister/Login.vue";
import Register from "@/components/loginAndRegister/Register.vue"
import Home from "@/components/panel/Home.vue"
// 搜索组件
import EasySearch from "@/components/panel/models/search/EasySearch.vue"
import BasicSearch from "@/components/panel/models/search/BasicSearch.vue"
import ProfessionalSearch from "@/components/panel/models/search/ProfessionalSearch.vue"
// 主页导航栏组件
import DiscussionMain from "@/components/panel/models/discussion/Main.vue"
import SearchMain from "@/components/panel/models/search/Main.vue"
import HelpMain from "@/components/panel/models/help/Main.vue"
import PersonalInfoMain from "@/components/panel/models/personalInfo/Main.vue"
import SearchHistoryMain from "@/components/panel/models/searchHistory/Main.vue"
import ArticleMain from "@/components/panel/models/article/Main.vue"
// 后台管理组件
import Background from "@/components/background/Background.vue"
import BackgroundArticleAdd from "@/components/background/models/ArticleAdd.vue"
import BackgroundArticleEdit from "@/components/background/models/ArticleEdit.vue"
import BackgroundArticlePanel from "@/components/background/models/ArticlePanel.vue"
import BackgroundMemberPanel from "@/components/background/models/MemberPanel.vue"
import BackgroundMemberAdd from "@/components/background/models/MemberAdd.vue"
import BackgroundDiscussionPanel from "@/components/background/models/DiscussionPanel.vue"
import BackgroundChildComment from "@/components/background/models/ChildComments.vue"
import {
  UserService
} from "@/api/api"

const routes = [{
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/background",
    name: "Background",
    component: Background,
    children: [{
        path: "article/add",
        name: "ArticleAdd",
        component: BackgroundArticleAdd
      }, {
        path: "article/edit",
        name: "ArticleEdit",
        component: BackgroundArticleEdit
      }, {
        path: "article/panel",
        name: "ArticlePanel",
        component: BackgroundArticlePanel
      }, {
        path: "member/add",
        name: "MemberAdd",
        component: BackgroundMemberAdd
      }, {
        path: "member/panel",
        name: "MemberPanel",
        component: BackgroundMemberPanel
      }, {
        path: "discussion/panel",
        name: "DiscussionPanel",
        component: BackgroundDiscussionPanel
      },
      {
        path: "discussion/child",
        name: "CommentChild",
        component: BackgroundChildComment
      },
    ]
  },
  {
    path: "/",
    component: Home,
    redirect: '/search',
    name: "Home",
    children: [{
        path: "search",
        name: "SearchMain",
        component: SearchMain,
        redirect: "/search/easy_search",
        children: [{
            path: "easy_search",
            name: "EasySearch",
            component: EasySearch
          },
          {
            path: "basic_search",
            name: "BasicSearch",
            component: BasicSearch
          },
          {
            path: "professional_search",
            name: "ProfessionalSearch",
            component: ProfessionalSearch
          },
        ]
      },
      {
        path: "discussion",
        name: "Discussion",
        component: DiscussionMain
      },
      {
        path: "help",
        name: "Help",
        component: HelpMain
      },
      {
        path: "personalInfo",
        name: "PersonalInfo",
        component: PersonalInfoMain
      },
      {
        path: "article",
        name: "Article",
        component: ArticleMain
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
let type = ""
// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from) => {
  UserService.getUserInfo().then((res) => {
    type = res.data.data.types
  })
  if (type != "") {
    switch (to.name) {
      case "Background":
        if (type != "root" && type != "administrator") {
          router.go(-1)
        }
        break
      case "MemberAdd":
        if (type != "root") {
          router.push({
            path: "/background"
          })
        }
        break
      case "MemberPanel":
        if (type != "root") {
          router.push({
            path: "/background"
          })
        }
        break
    }
  }

});

export default router;