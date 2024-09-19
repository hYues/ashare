import { workspace, WorkspaceConfiguration } from "vscode";
import { AppConfig } from "../types/app";
import { events } from "../utils/useEvents";

export default class AppService {
  private appName: string = "ashare";

  constructor() {
    this.getConfiguration();
    workspace.onDidChangeConfiguration(this.configChanged, this);
  }

  private configChanged() {
    this.getConfiguration();
  }

  public getConfiguration() {
    const config = workspace.getConfiguration(this.appName);
    return this.formatConfig(config);
  }

  public getConfig(key: string, defaultValue?: any): any {
    const config = workspace.getConfiguration(this.appName);
    return config.get(key, defaultValue);
  }

  public updateConfig(
    key: string,
    value: Array<any> | string | number | Object
  ) {
    events.emit("updateConfig:" + key, value);
    const config = workspace.getConfiguration();
    return config.update(key, value, true);
  }

  /**
   * 格式化配置项
   */
  private formatConfig(config: WorkspaceConfiguration) {
    const options: AppConfig = {
      stock: config.get("stock", "SH000001"),
      code: "000001",
      market: 1, // 0-深市；1-沪市
      height: config.get("picHeight", 578),
      autoRefresh: config.get("autoRefresh", false),
      autoRefreshTime: config.get("autoRefreshTime", 300000),
      secid: "1.000001", // `${config.market}.${config.code}`
    };

    if (options.stock.toLowerCase().startsWith("sz")) {
      options.market = 0;
    }

    const code = options.stock.match(/\d+/);
    if (code && code.length) {
      options.code = code[0];
    }

    // 最小刷新时长不少于三秒
    if (options.autoRefreshTime < 3000) {
      options.autoRefreshTime = 3000;
    }

    options.secid = `${options.market}.${options.code}`;

    return options;
  }
}
