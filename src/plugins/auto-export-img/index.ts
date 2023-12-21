import { IApi } from '@umijs/max';
import path from 'path';
import fs from 'fs';

import { initExportImg } from './initExportImg';
import { ExportImgConfig } from './type';

export default (api: IApi) => {
  // 描述插件
  api.describe({
    key: 'autoImgExport',
    config: {
      schema(joi) {
        return joi.object().default({
          dirPath: 'images',
          deep: true,
          reg: /\.(png|jpe?g|svg)$/,
        });
      },
    },
    enableBy: api.EnableBy.config,
  });

  api.onStart(() => {
    const autoImgExport = api.config.autoImgExport;
    const { dirPath } = autoImgExport as ExportImgConfig;

    const filePath = path.resolve(process.cwd(), dirPath);

    const data = `
        const data = ''
        
        export default data
    `;

    if (!fs.existsSync(path.join(filePath, 'index.ts'))) {
      fs.writeFileSync(path.join(filePath, 'index.ts'), data);
    }
  });

  api.onDevCompileDone((opts) => {
    if (!opts.isFirstCompile) return;

    const autoImgExport = api.config.autoImgExport;
    const { dirPath, deep, reg } = autoImgExport as ExportImgConfig;

    initExportImg({ dirPath, deep, reg });
  });
};
