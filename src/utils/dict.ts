import { isArray, isNil, isObject, keys } from 'lodash-es';
import { DictReflect } from '../components';

const EMPTY_VALUE = '-';

/**
 * 处理字典值
 * @param dictMap
 * @param detailValue
 * @param dictReflect
 * @returns
 */
export function dispatchDictData(
  dictMap: Record<string, string> | any[] | undefined | null,
  detailValue: any,
  dictReflect: DictReflect,
) {
  if (isNil(detailValue) || !dictMap) return EMPTY_VALUE;

  if (isArray(dictMap)) {
    const result = ((dictMap || []) as any[]).find(
      (item: Record<string, any>) => {
        if (!item[dictReflect['key']]) return false;

        return item[dictReflect['key']] === detailValue;
      },
    );

    return result[dictReflect['label']] || EMPTY_VALUE;
  }

  if (isObject(dictMap)) {
    return (dictMap as Record<string, string>)[detailValue] || EMPTY_VALUE;
  }
}

/**
 * 获取字典映射
 * @param {Record<string, string> | any[] | null} dictMap - 字典映射对象或数组或null
 * @param {Record<string, string> | undefined} globalDict - 全局字典对象或undefined
 * @param {string} dictKey - 字典键
 * @returns {Record<string, string> | any[] | {} | null | {} | undefined} - 返回字典映射或者空对象
 */
export function getDictMap({
  dictMap,
  globalDict,
  dictKey,
}: {
  dictKey: string | undefined;
  dictMap?: Record<string, string> | any[] | null;
  globalDict?: Record<string, string> | undefined;
}): Record<string, string> | any[] | undefined | null {
  if (dictMap) return dictMap;

  if (!dictKey) return {};

  if (!keys(globalDict ?? {})?.length) return {};

  return (globalDict?.[dictKey] ?? {}) as Record<string, string>;
}
