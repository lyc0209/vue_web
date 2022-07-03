import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

import localCache from "@/utils/cache"

import ArticleList from "@/views/main/blog/article/ArticleList.vue"

const routes: RouteRecordRaw[] = [
  // {
  //   path: "/",
  //   redirect: "/main"
  // },
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/",
    name: "main",
    redirect: "/articlelist",
    component: () => import("@/views/main/Main.vue"),
    children: [
      {
        path: "/articlelist",
        name: "articlelist",
        component: ArticleList,
        meta: {
          title: "博客"
        }
      },
      {
        path: "/article",
        name: "article",
        component: () => import("@/views/main/blog/article/ArticleDetail.vue")
      }
    ]
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/Admin.vue"),
    children: []
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/not-found/NotFound.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== "/login" && to.path.indexOf("/admin") !== -1) {
    const token = localCache.getCache("token")
    if (!token) {
      return "/login"
    }
  }

  // if (to.path === "/main") {
  //   return firstMenu?.url ?? "main"
  // }
})

export default router
