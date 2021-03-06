import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export const DATE_TIME_FORMAT_DEFAULT = "YYYY-MM-DD HH:mm:ss"

/**
 * utc时间格式化
 * @param utc utc
 * @param format 格式
 * @returns string
 */
export function utcToString(utc: string, format: string = DATE_TIME_FORMAT_DEFAULT) {
  return dayjs.utc(utc).utcOffset(8).format(format)
}

/**
 * 时间戳格式化
 * @param timestamp 10/13位时间戳
 * @param format 格式
 * @returns string
 */
export function timestampToString(timestamp: number, format: string = DATE_TIME_FORMAT_DEFAULT) {
  return dayjs(timestamp.toString().length === 10 ? timestamp * 1000 : timestamp).format(format)
}

export function getDateDiffText(timestamp: number) {
  const date1 = dayjs()
  const date2 = dayjs(timestamp)
  return date1.diff(date2, "d") + "天"
}
