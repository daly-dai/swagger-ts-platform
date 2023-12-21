import chokidar, { FSWatcher } from 'chokidar';
import { ExportImgConfig } from './type';
import geneRateImgExport from './generateFile';

let watcher: FSWatcher;
let globalConfig: ExportImgConfig;

function createWatcher() {
  watcher = chokidar.watch(globalConfig.dirPath, {
    ignored: 'index.ts', // ignore botflies
    ignoreInitial: true,
    persistent: true,
    awaitWriteFinish: true,
  });
}

const initExportImg = ({
  dirPath,
  deep = false,
  reg = /\.(png|jpe?g|svg)$/,
  openWatch = false,
}: ExportImgConfig) => {
  if (!dirPath) {
    throw Error('need  dirPath config');
  }

  globalConfig = { dirPath, deep, reg, openWatch };

  if (watcher) return;

  createWatcher();

  geneRateImgExport(dirPath, deep, reg);

  (watcher as FSWatcher).on('all', (event, path) => {
    console.log(event, path, 'path');
    if (event === 'change' && path.includes('index.ts')) return;

    geneRateImgExport(dirPath, deep, reg);
  });
};

export { initExportImg };
