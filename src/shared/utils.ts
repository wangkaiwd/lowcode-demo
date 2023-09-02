let i = 0;
export const uid = () => {
  const timestamps = Date.now();
  return String(timestamps + i++);
};

export const getAbsMaxValues = (number1: number, number2: number) => {
  const absNumber1 = Math.abs(number1);
  const absNumber2 = Math.abs(number2);
  // 0,1
  if (absNumber1 >= absNumber2) {
    if ((number1 >= 0 && number2 >= 0) || (number1 <= 0 && number2 <= 0)) {
      return {
        x: number1,
        y: number1
      };
    } else {
      return {
        x: number1,
        y: -number1
      };
    }
  } else {
    if ((number1 >= 0 && number2 >= 0) || (number1 <= 0 && number2 <= 0)) {
      return {
        x: number2,
        y: number2
      };
    } else {
      return {
        x: -number2,
        y: number2
      };
    }
  }
};

export const isFunction = (value: any) => {
  return typeof value === 'function';
};
