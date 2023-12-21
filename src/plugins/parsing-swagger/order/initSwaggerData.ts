import { AnyObject, AnyStringOrObject, SwaggerSpec } from '../types';
import yaml from 'js-yaml';
import SwaggerParser from '@apidevtools/swagger-parser';
import { PARAMS_NEED_KEYS, validRequestMethods } from '../constants';
import { type OpenAPI, type OpenAPIV2, type OpenAPIV3 } from 'openapi-types';
import { get, keys } from 'lodash-es';
import { createCode } from '@/utils';

/**
 * 解析JSON或YAML字符串并返回结果。
 * @param value 字符串或任何类型的对象
 * @returns 任何类型的对象
 */
function parseJsonOrYaml(value: string | AnyObject): AnyObject {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as AnyObject;
    } catch (error) {
      // String starts with { or [, so it’s probably JSON.
      if (value.length > 0 && ['{', '['].includes(value[0])) {
        throw error;
      }

      // Then maybe it’s YAML?
      return yaml.load(value) as AnyObject;
    }
  }

  return value as AnyObject;
}

/**
 * 移除没有操作的标签
 * @param spec SwaggerSpec对象
 * @returns 经过处理的SwaggerSpec对象
 */
function removeTagsWithoutOperations(spec: SwaggerSpec) {
  return {
    ...spec,
    tags: spec.tags?.filter(
      (tag: { operations: string | any[] }) => tag.operations?.length > 0,
    ),
  };
}

/**
 * 分发路径参数
 * @param pathParams 路径参数数组
 * @returns 分发后的路径参数对象
 */
function dispatchPathParams(pathParams: any[]) {
  if (!pathParams || !pathParams.length) return {};

  const paramsInstance = pathParams[0];
  const schema = paramsInstance?.schema ?? {};
  const properties = get(schema, 'properties', {});

  // 为pathParamsObj构建所需键值
  const pathParamsObj: AnyObject = {
    properties,
  };
  // 提取公共数据
  for (const key of PARAMS_NEED_KEYS) {
    if (schema[key]) {
      pathParamsObj[key] = schema[key];
    }
  }

  // 如果schema中没有指定必需的属性，直接返回properties
  if (!schema?.required?.length) {
    return pathParamsObj;
  }

  // 遍历required属性，为properties对象中对应的属性设置required为true
  for (const key of schema.required) {
    if (properties[key]) {
      properties[key].required = true;
    }
  }

  return pathParamsObj;
}

/**
 * 处理返回之后的数据
 * @param responses
 */
const dispatchPathResponses = (responses: AnyObject) => {
  const responseDataObj: any = {};
  keys(responses).forEach((key: string) => {
    const response = responses[key];
    const responseData = get(response, 'schema.properties.data', null);

    if (!responseData) return {};

    responseDataObj[key] = responseData;
  });

  return responseDataObj;
};

/**
 * 将OpenAPI文档转换为SwaggerSpec对象
 * @param result OpenAPI.Document<object>类型的参数，表示OpenAPI文档
 * @returns SwaggerSpec类型的对象，表示转换后的SwaggerSpec对象
 */
function transformResult(result: OpenAPI.Document<object>): SwaggerSpec {
  if (!result.tags) {
    result.tags = [];
  }

  if (!result.paths) {
    result.paths = {};
  }

  Object.keys(result.paths).forEach((path: string) => {
    // @ts-ignore
    const requestMethods = Object.keys(result.paths[path]).filter((key) =>
      validRequestMethods.includes(key.toUpperCase()),
    );

    requestMethods.forEach((requestMethod) => {
      // @ts-ignore
      const operation = result.paths[path][requestMethod];
      // @ts-ignore
      const parameters = operation?.parameters;

      const responses = operation?.responses;

      // Transform the operation
      const newOperation = {
        key: createCode(10),
        httpVerb: requestMethod,
        path,
        operationId: operation.operationId || path,
        name: operation.summary || path || '',
        description: operation.description || '',
        information: {
          ...operation,
        },
        responses: dispatchPathResponses(responses),
        // @ts-ignore
        params: dispatchPathParams(parameters),
      };

      // If there are no tags, we’ll create a default one.
      if (!operation.tags || operation.tags.length === 0) {
        // Create the default tag.
        if (
          !result.tags?.find(
            (tag: OpenAPIV2.TagObject | OpenAPIV3.TagObject) =>
              tag.name === 'default',
          )
        ) {
          result.tags?.push({
            name: 'default',
            description: '',
            // @ts-ignore
            operations: [],
            kry: createCode(10),
          });
        }

        // find the index of the default tag
        const indexOfDefaultTag = result.tags?.findIndex(
          (tag: OpenAPIV2.TagObject | OpenAPIV3.TagObject) =>
            tag.name === 'default',
        );

        // Add the new operation to the default tag.
        // @ts-ignore
        if (indexOfDefaultTag >= 0) {
          // Add the new operation to the default tag.
          // @ts-ignore
          result.tags[indexOfDefaultTag]?.operations.push(newOperation);
        }
      }
      // If the operation has tags, loop through them.
      else {
        operation.tags.forEach((operationTag: string) => {
          // Try to find the tag in the result
          const indexOfExistingTag = result.tags?.findIndex(
            // @ts-ignore
            (tag: SwaggerTag) => tag.name === operationTag,
          );

          // Create tag if it doesn’t exist yet
          if (indexOfExistingTag === -1) {
            result.tags?.push({
              name: operationTag,
              description: '',
            });
          }

          // Decide where to store the new operation
          const tagIndex =
            indexOfExistingTag !== -1
              ? indexOfExistingTag
              : // @ts-ignore
                result.tags.length - 1;

          // Create operations array if it doesn’t exist yet
          // @ts-ignore
          if (typeof result.tags[tagIndex]?.operations === 'undefined') {
            // @ts-ignore
            result.tags[tagIndex].operations = [];
          }

          // Add the new operation
          // @ts-ignore
          result.tags[tagIndex].operations.push(newOperation);
          // @ts-ignore
          result.tags[tagIndex].key = createCode(10);
        });
      }
    });
  });

  const returnedResult = result as unknown as SwaggerSpec;

  return removeTagsWithoutOperations(returnedResult);
}

/**
 * 解析Swagger文件
 * @param value - Swagger文件内容
 * @returns 解析后的Swagger规范
 */
export default async function initSwaggerData(
  value: AnyStringOrObject,
): Promise<SwaggerSpec> {
  return new Promise((resolve, reject) => {
    try {
      const data = parseJsonOrYaml(value) as OpenAPI.Document<object>;

      SwaggerParser.dereference(data, (error, result) => {
        if (error) {
          reject(error);
        }

        if (result === undefined) {
          reject('Couldn’t parse the Swagger file.');

          return;
        }

        const transformedResult = transformResult(result);
        console.log(transformedResult, 'transformedResult');
        resolve(transformedResult);
      });
    } catch (error) {
      reject(error);
    }
  });
}
