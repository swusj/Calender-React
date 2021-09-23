// 获取当前时间数据
function getCurHourMinSec() {
  const nowDate = new Date();
  const hour = nowDate.getHours();
  const minute = nowDate.getMinutes();
  const second = nowDate.getSeconds();
  return { hour, minute, second };
}

/**
 * 格式化时钟文字
 *
 * @param {boolean} isNeedzero 是否格式化0
 * @returns {string}
 * @example
 * createClockStr() => '12:01:34'
 * createClockStr(false) => '12:1:34'
 */
function createClockStr(isNeedzero = true) {
  let { hour, minute, second } = getCurHourMinSec();
  if (isNeedzero) {
    minute = isNeedzero ? (minute < 10 ? `0${minute}` : minute) : minute;
    second = second < 10 ? `0${second}` : second;
  }
  let clockStr = `${hour}:${minute}:${second}`;
  return clockStr;
}

export { getCurHourMinSec, createClockStr };
