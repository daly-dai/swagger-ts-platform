import initSwaggerData from './order/initSwaggerData';
import { AnyStringOrObject } from './types';

export default async function SwaggerParse(data: AnyStringOrObject) {
  const swaggerData = await initSwaggerData(data);

  

  return swaggerData;
}
