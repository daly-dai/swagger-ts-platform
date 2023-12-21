export type RequireContext = (
  directory: string,
  useSubdirectories?: boolean,
  regExp?: RegExp,
) => any[];

export type GeneRateImgExport = (
  directory: string,
  useSubdirectories?: boolean,
  regExp?: RegExp,
) => void;

export interface ExportImgConfig {
  dirPath: string;
  deep?: boolean;
  reg?: RegExp;
  openWatch?: boolean;
}

export declare function initExportImg(body: ExportImgConfig): void;
