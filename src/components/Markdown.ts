import { MarkdownString } from "vscode";

export default class Markdown {
  /**
   * 创建 html 格式的 Markdown 文档
   */
  public static createMarkdownWithHtml(val: string) {
    const markdownStr = new MarkdownString();
    markdownStr.supportHtml = true;
    markdownStr.appendMarkdown(val);
    return markdownStr;
  }
}
