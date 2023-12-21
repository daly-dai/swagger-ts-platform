import { request } from '@umijs/max';

export interface AuthCenterModel {
  appCode?: string;
  clientId?: string;
  sign?: string;
  sno?: string;
  tenantId?: string;
}

/**
 * @description 获取当前应用在用户权限中心的配置信息,当前为工时系统，请根据需要修改
 * @request get:/irs-front/system/getLoginConfig
 */
export const systemGetLoginConfigByGet = () =>
  request<AuthCenterModel>('/szhz-ets-server-web/props', {
    method: 'get',
  });
