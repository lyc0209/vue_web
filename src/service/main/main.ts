import lycRequest from "../index"

enum MainApi {
  IndexInfo = "/view/index",
  ArticleList = "/view/article/list",
  Article = "/view/article"
}

export function getIndexInfoApi() {
  return lycRequest.get({
    url: MainApi.IndexInfo
  })
}

export function getArticleListApi(param: any) {
  return lycRequest.get({
    url: MainApi.ArticleList,
    data: param
  })
}

export function getArticleDetailActionApi(param: any) {
  return lycRequest.get({
    url: `${MainApi.Article}/${param.id}`
  })
}
