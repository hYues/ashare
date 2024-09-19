import { StatusBarAlignment, StatusBarItem, window } from "vscode";
import { getStockData, getStockTrendUrl } from "../api/stock";
import AppService from "../services/AppService";
import { EastmoneyStockRes } from "../types/app";
import Markdown from "./Markdown";

export default class StatusBar {
  private appService: AppService;
  private statusBarItem: StatusBarItem;
  private statusBarIcon: string = "$(graph-line)";

  constructor(appService: AppService) {
    this.appService = appService;
    this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
    this.refresh();
  }

  /**
   * 更新状态栏信息
   */
  private updateStatusBar() {
    this.statusBarItem.text = `${this.statusBarIcon} Ashare`;
    this.statusBarItem.tooltip = Markdown.createMarkdownWithHtml(
      this.getStockTrendPic()
    );
    this.statusBarItem.command = "ashare.now";
    this.statusBarItem.show();
  }

  /**
   * 刷新状态栏信息
   */
  public refresh() {
    this.updateStatusBar();
  }

  /**
   * 更新显示的文本内容
   */
  public refreshText() {
    const config = this.appService.getConfiguration();
    getStockData(config.secid).then((res: unknown) => {
      const stockData = <EastmoneyStockRes>res;
      if (stockData && stockData?.data) {
        const { data } = stockData;
        if (data) {
          const name = data.f58;
          const currentPrice = data.f43 / 100;
          const startAt = data.f46 / 100;
          const priceCompre = currentPrice >= startAt ? "📈" : "📉";

          this.statusBarItem.text = `${priceCompre} ${name} [ ${currentPrice} ]`;
          console.log(this.statusBarItem.text);
        }
      }
    });
  }

  /**
   *加载股票今日走势图
   * @returns String
   */
  private getStockTrendPic(): string {
    const config = this.appService.getConfiguration();
    return `<img src="${getStockTrendUrl(config.secid)}" width=${
      config.height
    }/>`;
  }
}
