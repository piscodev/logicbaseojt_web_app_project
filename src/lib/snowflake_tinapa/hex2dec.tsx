export function hexToDec(hexStr: string): string {
  if (hexStr.substring(0, 2) === "0x") hexStr = hexStr.substring(2);
  hexStr = hexStr.toLowerCase();

  const convertBase = (str: string, fromBase: number, toBase: number): string => {
    const parseToDigitsArray = (str: string, base: number): number[] | null => {
      const digits = str.split("");
      const ary: number[] = [];
      for (let i = digits.length - 1; i >= 0; i--) {
        const n = parseInt(digits[i], base);
        if (isNaN(n)) return null;
        ary.push(n);
      }
      return ary;
    };

    const multiplyByNumber = (
      num: number,
      x: number[],
      base: number
    ): number[] => {
      if (num < 0) return [];
      if (num === 0) return [];
      let result: number[] = [];
      let power = x;
      while (true) {
        if (num & 1) result = add(result, power, base);
        num >>= 1;
        if (num === 0) break;
        power = add(power, power, base);
      }
      return result;
    };

    const add = (x: number[], y: number[], base: number): number[] => {
      const z: number[] = [];
      const n = Math.max(x.length, y.length);
      let carry = 0;
      let i = 0;
      while (i < n || carry) {
        const xi = i < x.length ? x[i] : 0;
        const yi = i < y.length ? y[i] : 0;
        const zi = carry + xi + yi;
        z.push(zi % base);
        carry = Math.floor(zi / base);
        i++;
      }
      return z;
    };

    const digits = parseToDigitsArray(str, fromBase);
    if (!digits) return "";

    let outArray: number[] = [];
    let power = [1];
    for (const digit of digits) {
      if (digit) {
        outArray = add(
          outArray,
          multiplyByNumber(digit, power, toBase),
          toBase
        );
      }
      power = multiplyByNumber(fromBase, power, toBase);
    }

    return outArray.reverse().join("");
  };

  return convertBase(hexStr, 16, 10);
}
