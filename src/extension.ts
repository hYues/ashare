import * as vscode from "vscode";
import { get } from "./utils/useAxios";
import { EastmoneyStockRes } from "./types/app";

/** 获取配置数据 */
const getConfig = () => {
  const config = vscode.workspace.getConfiguration("ashare");
  const options = {
    stock: config.get("stock", "SH000001"),
    code: "000001",
    market: 1, // 0-深市；1-沪市
    height: config.get("picHeight", 578),
    date: Date.now(),
  };

  if (options.stock.toLowerCase().startsWith("sz")) {
    options.market = 0;
  }

  const code = options.stock.match(/\d+/);
  if (code && code.length) {
    options.code = code[0];
  }
  return options;
};

/** 生成 Markdown 格式的文本*/
const createMarkdownString = () => {
  const markdownStr = new vscode.MarkdownString();
  markdownStr.supportHtml = true;
  markdownStr.appendMarkdown(getStockPic());
  return markdownStr;
};

/** 获取股票今日走势图 */
const getStockPic = () => {
  const config = getConfig();
  return `<img src="https://webquotepic.eastmoney.com/GetPic.aspx?imageType=r&nid=${config.market}.${config.code}&timespan=${config.date}" width=${config.height}/>`;
};

/** 获取股票今日数据 */
const getStockData = async () => {
  const config = getConfig();
  await get(
    `https://push2.eastmoney.com/api/qt/stock/get?secid=${config.market}.${config.code}`
  )
    .then((res: unknown) => {
      if (res) {
        const { data } = res as EastmoneyStockRes;
        if (data) {
          const name = data.f58;
          const code = data.f57;
          const currentPrice = data.f43 / 100;
          const maxPrice = data.f44 / 100;
          const minPrice = data.f45 / 100;

          vscode.window.showInformationMessage(
            `${name} [${code}] 股价走势 📈`,
            `📌 最新：${currentPrice}`,
            `最高：${maxPrice}`,
            `最低：${minPrice}`
          );
        }
      }
    })
    .catch((err) => {
      console.warn("请求接口失败", err);
    });
};

/** 创建股票状态栏 */
const createCustomStatusBar = () => {
  // 创建状态栏项
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );

  statusBarItem.text = "$(graph-line) Ashare";
  statusBarItem.tooltip = createMarkdownString();
  statusBarItem.show();
  statusBarItem.command = "ashare.now";

  return statusBarItem;
};

// 激活
export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = createCustomStatusBar();
  context.subscriptions.push(
    // 监听配置变动
    vscode.workspace.onDidChangeConfiguration(() => {
      statusBarItem.tooltip = createMarkdownString();
    }),
    // 注册命令
    vscode.commands.registerCommand("ashare.now", async () => {
      await getStockData();
    })
  );
}

// 卸载
export function deactivate() {}
