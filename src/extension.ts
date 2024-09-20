import { ExtensionContext, window, workspace } from "vscode";
import StatusBar from "./components/StatusBar";
import { registerCommands } from "./registerCommand";
import AppService from "./services/AppService";
import StockService from "./services/StockService";
import { isStockTime } from "./utils/time";

let loopTimer: NodeJS.Timeout | null = null;

function clearLoopTimer() {
  if (loopTimer) {
    clearInterval(loopTimer);
    loopTimer = null;
  }
}

// 激活
export function activate(context: ExtensionContext) {
  const appService = new AppService();
  const stockService = new StockService(appService);

  // 创建状态栏
  const statusBar = new StatusBar(appService);

  // 创建定时器
  const setIntervalTime = () => {
    const config = appService.getConfiguration();

    if (!config.autoRefresh) {
      return;
    }

    clearLoopTimer();

    loopTimer = setInterval(() => {
      // 检测是否为交易时间
      if (!isStockTime()) {
        statusBar.refresh();
      } else {
        statusBar.refreshText();
      }
    }, config.autoRefreshTime);
  };

  setIntervalTime();

  // 监听配置变动
  workspace.onDidChangeConfiguration(() => {
    setIntervalTime();
    statusBar.refresh();
  });

  // 监听工作区激活状态
  window.onDidChangeWindowState((event) => {
    if (event.focused) {
      // 工作区被激活
      statusBar.show();
      setIntervalTime();
    } else {
      // 工作区失去焦点
      clearLoopTimer();
      statusBar.hide();
    }
  });

  // 注册命令
  registerCommands(context, stockService);
}

// 卸载
export function deactivate() {
  clearLoopTimer();
}
