/** 东方财富获取单只股票详情 */
export interface EastmoneyStockRes {
  rc: 0;
  rt: 4;
  svr: number;
  lt: 1;
  full: 1;
  data: {
    /** 当前 */
    f43: number;
    /** 最高 */
    f44: number;
    /** 最低 */
    f45: number;
    /** 今开 */
    f46: number;
    /** code */
    f57: string;
    /** name */
    f58: string;
    /** 昨收 */
    f60: number;
    /** 时间戳（秒） */
    f86: number;
    /** market */
    f107: number;
  };
}

export interface AppConfig {
  /** 股票代码 */
  stock: string;
  /** 代码 */
  code: string;
  /** 交易所 */
  market: 0 | 1;
  /** 走势图高度  */
  height: number;
  /** 是否开启自动刷新 */
  autoRefresh: boolean;
  /** 自动刷新间隔时间 */
  autoRefreshTime: number;
  /** API 查询到组合字段： market.code */
  secid: string;
}
