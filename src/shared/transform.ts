export const getRotateDeg = (transform: string) => {
  const reg = /rotate\((.*)deg\)/;
  const matched = reg.exec(transform);
  if (matched) {
    return Number(matched[1]);
  }
  return 0;
};
