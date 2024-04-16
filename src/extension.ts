import * as vscode from "vscode";

const createMarkdownString = () => {
  const markdownStr = new vscode.MarkdownString();
  markdownStr.supportHtml = true;
  markdownStr.appendMarkdown(getStockPic());
  return markdownStr;
};

const getStockPic = () => {
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

  return `<img src="https://webquotepic.eastmoney.com/GetPic.aspx?imageType=r&nid=${options.market}.${options.code}&timespan=${options.date}" width=${options.height}/>`;
};

// 激活
export function activate(context: vscode.ExtensionContext) {
  // 创建状态栏项
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  statusBarItem.text = "$(graph-line) Ashare";
  statusBarItem.tooltip = createMarkdownString();
  statusBarItem.show();
  statusBarItem.command = "ashare.view";

  context.subscriptions.push(
    // 监听配置变动
    vscode.workspace.onDidChangeConfiguration(() => {
      statusBarItem.tooltip = createMarkdownString();
    })
  );
}

// 卸载
export function deactivate() {}
