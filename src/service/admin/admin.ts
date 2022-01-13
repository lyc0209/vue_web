import lycRequest from "../index"

export function getPageListData(url: string, queryInfo: any) {
  return lycRequest.get({
    url: url,
    data: queryInfo
  })
}

// url: /user/id
export function deletePageData(url: string) {
  return lycRequest.delete({
    url: url
  })
}

// url: /user
export function createPageData(url: string, newData: any) {
  return lycRequest.post({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return lycRequest.patch({
    url: url,
    data: editData
  })
}
