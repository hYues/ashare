import { window } from "vscode";
import { getStockData } from "../api/stock";
import { EastmoneyStockRes } from "../types/app";
import AppService from "./AppService";

export default class StockService {
  private appService: AppService;
  constructor(appService: AppService) {
    this.appService = appService;
  }

  /**
   * 获取股票今日数据
   */
  public showStockInfo() {
    const config = this.appService.getConfiguration();
    getStockData(config.secid)
      .then((res: unknown) => {
        const stockData = <EastmoneyStockRes>res;
        if (stockData && stockData?.data) {
          const { data } = stockData;
          if (data) {
            const name = data.f58;
            const code = data.f57;
            const currentPrice = data.f43 / 100;
            const maxPrice = data.f44 / 100;
            const minPrice = data.f45 / 100;
            const startAt = data.f46 / 100;
            const lastAt = data.f60 / 100;
            const priceCompre = startAt >= lastAt ? "📈" : "📉";

            // 暂未开盘
            if (!startAt) {
              return window
                .showInformationMessage(
                  `${name} [${code}] ${priceCompre} 昨收：${lastAt}，最新：${currentPrice} 📢`
                )
                .then(() => {});
            }

            window
              .showInformationMessage(
                `${name} [${code}] ${priceCompre} 昨收：${lastAt}，今开：${startAt} 📢`,
                `📌 最新：${currentPrice}`,
                `最高：${maxPrice}`,
                `最低：${minPrice}`
              )
              .then(() => {});
          }
        }
      })
      .catch((err: any) => {
        window
          .showInformationMessage(`请求数据失败，请稍候重试 👀`)
          .then(() => {});
      });
  }
}
