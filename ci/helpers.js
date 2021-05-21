import * as fs from 'fs';
import ncp from 'ncp';
import rimraf from 'rimraf';

export async function copyDir(from, to) {
  return new Promise((resolve, reject) => {
    ncp(from, to, error => {
      if (error) {
        reject(error);
        throw new Error(error);
      } else {
        resolve();
      }
    });
  });
}

export async function createFolder(folderPath) {
  try {
    await fs.mkdirSync(folderPath);
  } catch (error) {
    throw new Error(error);
  }
}

export async function copyFile(filePath, newComponentPath) {
  try {
    await fs.copyFileSync(filePath, newComponentPath);
  } catch (error) {
    throw new Error(error);
  }
}

export async function asyncForEach(array, callback) {
  for (let index = 0, arrayLength = array.length; index < arrayLength; index++) {
    await callback(array[index], index, array);
  }
}

export async function removeFolder(folderPath) {
  try {
    if (await fs.existsSync(folderPath)) {
      await rimraf.sync(folderPath);
    }
  } catch (error) {
    throw new Error(error);
  }
}
