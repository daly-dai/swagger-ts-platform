/**
 * 计算文字宽度
 *
 * @param {string} text - 文字
 * @param {string} font - '14px sans-serif' 字号 字体
 * @return {*}
 * @example
 */
export const getTextWidth = (text: string, font: string): number => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) return 0;

  context.font = font;
  const metrics = context.measureText(text + '');
  const actual =
    Math.abs(metrics.actualBoundingBoxLeft) +
    Math.abs(metrics.actualBoundingBoxRight);
  return Math.max(metrics.width, actual);
};

/**
 * 通过DOM获取文本的宽度
 * @param text - 待计算宽度的文本
 * @param font - 文本的字体大小和样式
 * @returns 文本的宽度
 */
export function getTextWidthByDom(text: string, font: string) {
  const span = document.createElement('span');
  span.style.fontSize = font;
  span.textContent = text;

  document.body.appendChild(span);

  const textWidth = span.offsetWidth;

  document.body.removeChild(span);

  return textWidth;
}

/**
 * 字符串首位是字母转大写
 * @param {string} name - 字符串
 * @return {string} 返回首字母转换成大写的字符串
 * @example
 * ```
 */
export const initialToCapital = (name: string): string => {
  const pattern = new RegExp('[A-Za-z]+');
  const str = name.substr(0, 1);
  if (pattern.test(str)) {
    return `${str.toUpperCase()}${name.substr(1)}`;
  } else {
    const str1 = name.substr(-1);
    return `${name.substr(0, name.length - 1)}${str1.toUpperCase()}`;
  }
};

/**
 * 删除字符串中的空格
 *
 * @param {string} str - 要操作的字符串
 * @return {string} 返回去除空格后的新字符串
 * @example
 */
export const removeSpaces = (str: string): string => str.replace(/\s/g, '');

/**
 * 字符替换
 *
 * @param {*} str - 表示将要替换的字符串
 * @param {*} oldChar - 表示你将要替换的字符
 * @param {*} newChar - 表示你想要替换的字符
 * @return {string} 返回替换后的字符串
 * @example
 *
 * ```ts
 * import { transFormat } from 'super-tools-lib'
 *
 * transFormat("2019-12-13", "-", "/") // 2019/12/13
 * ```
 */
export const transFormat = (str: string, oldChar: string, newChar: string) => {
  const reg = new RegExp(oldChar, 'g'); // g表示全部替换，默认替换第一个
  const result = str.replace(reg, newChar);

  return result;
};
