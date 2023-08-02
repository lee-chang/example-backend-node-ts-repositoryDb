import { Router } from "express";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { API_VERSION } from "@/config/env";

const PATH_ROUTER = `${__dirname}`;

const router = Router();

const version = API_VERSION;

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

const cleanPath = (path: string) => {

  const pathSplit = path.split(/\\|\//);
  const cleanPath = pathSplit[pathSplit.length - 1];
  return cleanPath;
}

const handleDirectory = (path: string) => {
  readdirSync(path).forEach((file) => {
    const cleanNameDirectory = cleanPath(path);
    const cleanName = cleanFileName(file);

    if (cleanName !== "index") {
      import(`./${cleanNameDirectory}/${cleanName}.route`).then((module) => {
        console.log(`Se cargo la ruta /api/${version}/${cleanNameDirectory}/${cleanName}`);
        router.use(`/api/${version}/${cleanNameDirectory}/${cleanName}`, module.router);
      });
    }

  });
};

readdirSync(PATH_ROUTER).forEach((file) => {
  const path = join(PATH_ROUTER, file);
  if (statSync(path).isDirectory()) {
    handleDirectory(path);
  } else {
    const cleanName = cleanFileName(file);
    if (cleanName !== "index") {
      import(`./${cleanName}.route`).then((module) => {
        console.log(`Se cargo la ruta /api/${version}/${cleanName}`);
        router.use(`/api/${version}/${cleanName}`, module.router);
      });
    }
  }
});

export { router };
