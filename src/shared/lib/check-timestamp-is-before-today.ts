export function checkTimestampIsBeforeToday(timestampInSecs: number) {
  return timestampInSecs <= Math.floor(Date.now() / 1000)
}
