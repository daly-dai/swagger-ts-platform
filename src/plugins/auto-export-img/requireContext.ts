import fs from 'fs';
import path from 'path';

import { RequireContext } from './type';

const requireContext: RequireContext = (
  directory,
  useSubdirectories = false,
  regExp = /\.js$/,
) => {
  const absoluteDirectory = path.resolve(directory);

  const readDirectory = (directoryPath: string): any[] => {
    const files = fs.readdirSync(directoryPath);

    return files.reduce((modules: any[], file) => {
      const absolutePath = path.join(directoryPath, file);

      if (fs.statSync(absolutePath).isDirectory()) {
        if (useSubdirectories) {
          // eslint-disable-next-line no-param-reassign
          modules = modules.concat(readDirectory(absolutePath));
        }

        return modules;
      }

      if (!regExp.test(absolutePath)) {
        return modules;
      }

      modules.push(absolutePath);

      return modules;
    }, []);
  };

  return readDirectory(absoluteDirectory);
};

export default requireContext;
