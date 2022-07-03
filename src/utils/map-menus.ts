import { RouteRecordRaw } from "vue-router"
import { IBreadCrumb } from "@/base-ui/breadcrumb"

// 缓存一下第一个子菜单，保证第一次进入，默认不选菜单的时候正常显示
let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context("../router/admin", true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // ../router/main/system/user/user.ts
    const route = require("../router/admin" + key.split(".")[1])
    allRoutes.push(route.default)
  })

  // 根据菜单获取需要添加的routes
  // type === 1 => children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2 || menu.type === 0) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}

export function mapMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leafKeys
}

export function pathMapToBreadCrumbs(userMenus: any[], currentPath: string) {
  const breadCrumbs: IBreadCrumb[] = []

  pathMapToMenu(userMenus, currentPath, breadCrumbs)

  return breadCrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadCrumbs?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    // 1级菜单，还有children
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadCrumbs?.push({ name: menu.name })
        breadCrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if ((menu.type === 2 || menu.type === 0) && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
