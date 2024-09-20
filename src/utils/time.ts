/**
 * 是否是交易时间
 */
export function isStockTime() {
  const startAtAM = getTimestampForTimeOfDay(9, 30);
  const endAtAM = getTimestampForTimeOfDay(11, 30);
  const startAtPM = getTimestampForTimeOfDay(13, 0);
  const endAtPM = getTimestampForTimeOfDay(15, 0);

  const now = Date.now();

  if (
    (now >= startAtAM && now <= endAtAM) ||
    (now >= startAtPM && now <= endAtPM)
  ) {
    return true;
  }

  return false;
}

/**
 * 根据传入的时间段数据返回该数据段的时间戳
 * @param hour
 * @param minute
 * @param second
 * @param millisecond
 * @returns
 */
function getTimestampForTimeOfDay(
  hour: number,
  minute: number,
  second: number = 0,
  millisecond: number = 0
) {
  // 创建一个表示当前日期的Date对象
  const now = new Date();

  // 重置时间部分
  now.setHours(hour, minute, second, millisecond);

  // 返回时间戳
  return now.getTime();
}
