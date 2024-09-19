import { commands, ExtensionContext } from "vscode";
import StockService from "./services/StockService";

/**
 * 注册指令
 */
export function registerCommands(
  context: ExtensionContext,
  stockService: StockService
) {
  context.subscriptions.push(
    commands.registerCommand("ashare.now", () => {
      stockService.showStockInfo();
    })
  );
}
