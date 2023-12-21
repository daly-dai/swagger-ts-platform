import path from 'path';
import fs from 'fs';

import requireContext from './requireContext';
import { GeneRateImgExport } from './type';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createCode } from './utils';

let fileNameMap: Record<string, string> = {};

export const capitalizedWord = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

function getExportFileName(name: string) {
  let stashName = name.replace(/\s+/g, '-').replace(/_/g, '-');

  const nameList = stashName.split('-');

  if (nameList.length === 1) return nameList[0];

  return nameList
    .map((item: string, index: number) => {
      let stashItem = item;

      if (index === 0) return stashItem;

      return capitalizedWord(stashItem);
    })
    .join('');
}

function toExportStatement(filePath: string, dirPathResolve: string) {
  const filePathReferenceDir = filePath
    .replace(dirPathResolve, '')
    .replace(/\\/g, '/');

  let mapName = path.basename(filePath, path.extname(filePath));

  mapName = getExportFileName(mapName);

  // if (fileNameMap[mapName]) {
  //   mapName = `${mapName}_${createCode()}`;
  // }

  fileNameMap[mapName] = mapName;

  return `export { default as ${mapName} } from '.${filePathReferenceDir}';\n`;
}

// 将指定目录下的所有图片文件转换成导出语句，并写入index.ts文件中
const geneRateImgExport: GeneRateImgExport = (
  directory,
  useSubdirectories = false,
  regExp = /\.(png|jpe?g|svg)$/,
) => {
  const dirPathResolve = path.resolve(process.cwd(), directory);

  const fileList = requireContext(dirPathResolve, useSubdirectories, regExp);
  const exportStatements = fileList
    .map((filePath: string) => toExportStatement(filePath, dirPathResolve))
    .join('');

  fs.writeFileSync(path.join(directory, 'index.ts'), exportStatements);

  console.log('img export file written successfully\n');
};

export default geneRateImgExport;
