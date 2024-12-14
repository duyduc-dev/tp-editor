import { get } from 'lodash/fp';
import { type MutableRefObject, type RefCallback } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { FalsyAble } from '@/types/common';

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const replacePathDynamic = <T extends object>(url: string, obj?: T) => {
  return url
    .split('/')
    .map((item) => {
      if (item.startsWith(':')) {
        const key = item.slice(1);
        // @ts-ignore
        const value = obj?.[key] ?? item;
        return value;
      }
      return item;
    })
    .join('/');
};

export const rgbaToHex = (rgba: string, forceRemoveAlpha = false) => {
  return (
    '#' +
    rgba
      .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
      .split(',') // splits them at ","
      .filter((_, index) => !forceRemoveAlpha || index !== 3)
      .map((string) => parseFloat(string)) // Converts them to numbers
      .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
      .map((number) => number.toString(16)) // Converts numbers to hex
      .map((string) => (string.length === 1 ? '0' + string : string)) // Adds 0 when length of one number is 1
      .join('')
  );
};

export const hexToRgba = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '');
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getLanguageByExt = (name?: string) => {
  if (!name) return '';
  const nameSplitted = name.split('.');
  const currFile = nameSplitted[nameSplitted.length - 1];
  const file: { [key: string]: string } = {
    js: 'javascript',
    jsx: 'javascript',
    json: 'json',
    tsx: 'typescript',
    ts: 'typescript',
    css: 'css',
    scss: 'scss',
  };
  return currFile ? file[currFile] : '';
};

export const select = <O extends object>(
  key: keyof O | null | undefined,
  value: O & { _default: O[keyof O] },
): O[keyof O] => {
  return key === null || key === undefined ? value['_default'] : value[key];
};

export const toCamelCase = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.?)/g, (_, chr) => chr.toUpperCase());
};

export const toCamelCaseKey = <T>(obj: object): T => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCaseKey(v)) as T;
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        // @ts-ignore
        [toCamelCase(key)]: toCamelCaseKey(obj[key]),
      }),
      {},
    ) as T;
  }
  return obj as T;
};

export const toSnakeCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .map((word) => word.toLowerCase())
    .join('_');
};

export const toSnakeCaseKey = <T>(obj: object): T => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCaseKey(v)) as T;
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        // @ts-ignore
        [toSnakeCase(key)]: toSnakeCaseKey(obj[key] as any),
      }),
      {},
    ) as T;
  }

  return obj as T;
};

export const isStringValid = (str: FalsyAble<string>) => {
  if (!str || str.trim() == '') {
    return false;
  }
  return true;
};

export const isFileNameValid = (str: FalsyAble<string>) => {
  if (!isStringValid(str) || (str && isStringStartWithNumber(str))) {
    return false;
  }
  return true;
};

export const isStringStartWithNumber = (str: string) => /^\d/.test(str);

export const generateUUID = () => uuidV4().split('-').join('');

export const getPropertyObject = <O extends object, K extends keyof O>(obj: O, k: K): O[K] =>
  get<O, K>(k)(obj);

export const limitString = (str?: FalsyAble<string>, limit = 20, endWidth = '...') => {
  if (!str) return '';
  if (str.length <= limit) return str;
  return str.slice(0, limit - endWidth.length) + endWidth;
};

type MutableRefList<T> = (RefCallback<T> | MutableRefObject<T> | undefined | null)[];

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
  return (val: T) => {
    setRef(val, ...refs);
  };
}

export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(val);
    } else if (ref != null) {
      ref.current = val;
    }
  });
}
