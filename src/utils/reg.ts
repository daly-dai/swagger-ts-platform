import { groupBy } from 'lodash-es';
import { RegItem, RegKeyType } from '../types/reg';

export const regMap: RegItem[] = [
  {
    key: 'mobile',
    message: '手机号，包括国外手机号',
    pattern:
      /^(((13[0-9]{1})|(14[5,7,9]{1})|(15[0-3,5-9]{1})|(166)|(17[0-3,5-8]{1})|(18[0-9]{1})|(19[8,9]{1}))+\d{8})$|(^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$)/,
  },
  {
    key: 'phone',
    message: '手机号',
    pattern:
      /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/,
  },
  {
    key: 'chinese_and_english',
    message: '汉字和英语',
    pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
  },
  {
    key: 'chinese10',
    message: '1～10个中文',
    pattern: /^(?:[\u4e00-\u9fa5·]{1,10})$/,
  },
  {
    key: 'website',
    message: '网址',
    pattern:
      /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/,
  },
  {
    key: 'nickname',
    message: '昵称',
    pattern: /^[\u4E00-\u9FA5a-zA-Z0-9]{2,12}$/,
  },
  {
    key: 'verify_code',
    message: '编码',
    pattern: /^\d{6}$/,
  },
  {
    key: 'verify_pwd',
    message: '密码',
    pattern: /^([a-zA-Z0-9_*@#]{6,16})$/,
  },
  {
    key: 'email',
    message: '邮箱',
    pattern:
      /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,
  },
  {
    key: 'character',
    message: '字符',
    pattern: /^.{0,254}$/,
  },
  {
    key: 'intNumber',
    message: '正整数',
    pattern: /^[1-9]\d*$/,
  },
  {
    key: 'positiveInt5',
    message: '正整数 1～5',
    pattern: /^[1-9]\d{0,4}$/,
  },
  {
    key: 'negativeInteger',
    message: '负整数',
    pattern: /^-[1-9]\d*$/,
  },
  {
    key: 'isNotNegativeFloatNum',
    message: '匹配非负浮点数',
    pattern: /^\d+(\.\d+)?$/,
  },
  {
    key: 'idCard',
    message: '身份证',
    pattern:
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  },
  {
    key: 'cPattern',
    message: '车牌号',
    pattern:
      /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  },
  {
    key: 'number',
    message: '数字0～30',
    pattern: /^[0-9]+.{0,1}[0-9]{0,30}$/,
  },
  {
    key: 'numeric_letters',
    message: '数字，字母，数字或字母，字母或数字组合',
    pattern: /^[0-9a-zA-Z]{0,40}$/g,
  },
  {
    key: 'chinese_numeric_letters',
    message: '数字，字母，汉字，任意组合',
    pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
  },
  {
    key: 'strong_password',
    message:
      '密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符*/',
    pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
  },
  {
    key: 'cname',
    message: '中文姓名',
    pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/,
  },
  {
    key: 'ename',
    message: '英文名 每一个单词首字母都是大写',
    pattern: /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
  },
  {
    key: 'ip',
    message: 'IP地址',
    pattern:
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  },
  {
    key: 'ipv4',
    message: 'ipv4',
    pattern:
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  },
  {
    key: 'color16pattern',
    message: '16进制颜色',
    pattern: /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i,
  },
  {
    key: 'mac',
    message: 'mac地址是否正确',
    pattern:
      /^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/,
  },
  {
    key: 'url_arr',
    message: '路径中是否存在数组，[]',
    pattern: /\[(\d*?)\]/gim,
  },
  {
    key: 'url',
    message: 'IP地址和域名',
    pattern: /^(http|https):\/\/([\w-]+\.)+[\w-]+(:[\d]+)?(\/.*)?$/,
  },
];

export const REG_KEY_MAP = groupBy(regMap, 'key') as Record<
  RegKeyType,
  RegItem[]
>;

/**
 * 验证函数，用于给定的键值对是否符合正则表达式的规则
 * @param key - 键名
 * @param value - 键值
 * @returns 如果符合规则则返回true，否则返回false
 */
export function validate(key: RegKeyType, value: any): boolean {
  if (!REG_KEY_MAP[key]?.length) return false;

  const regData = REG_KEY_MAP[key][0].pattern;

  return new RegExp(regData).test(value);
}
