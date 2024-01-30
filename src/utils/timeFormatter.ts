export const timeFormatter = (time: Date | string | number) => {
  const _time = new Date(time);
  const timeString = _time.toLocaleDateString().replaceAll("/", "-");
  return timeString;
};
