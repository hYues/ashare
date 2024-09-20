import { get } from "../utils/useAxios";

/**
 *
 * @param secid `${config.market}.${config.code}`
 * @returns
 */
export function getStockTrendUrl(secid: string) {
  return `https://webquotepic.eastmoney.com/GetPic.aspx?imageType=r&nid=${secid}&timespan=${Date.now()}`;
}

/**
 * 获取某只股票数据
 * @param secid `${config.market}.${config.code}`
 * @returns
 */
export async function getStockData(secid: string) {
  return get(`https://push2.eastmoney.com/api/qt/stock/get?secid=${secid}`);
}
