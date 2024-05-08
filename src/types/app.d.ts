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
