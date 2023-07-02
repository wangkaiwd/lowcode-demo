let i = 0;
export const uid = () => {
  const timestamps = Date.now();
  return String(timestamps + i++);
};
