import * as fs from 'fs';
import path from 'path';

export interface IHintData {
  rowHint: number[][];
  colHint: number[][];
  rowHintMaxLength: number;
  colHintMaxLength: number;
}

export interface IResourceData {
  rowSize: number;
  colSize: number;
  answer: boolean[];
  hint: IHintData;
}

const resDir = path.join(process.cwd(), "resources");

export function getGameResourceIds(): { params: {id: string} }[] {
  const resFileIds = fs.readdirSync(resDir);

  return resFileIds.map((id: string): { params: {id: string} } => {

    return {
      params: { 
        id: id.replace(/\.json$/, ''),
      },
    };
  });
}

export async function getGameResource(id: string): Promise<IResourceData> {
  const resFileName = path.join(resDir, `${id}.json`);
  const resFileData: IResourceData = JSON.parse(fs.readFileSync(resFileName, "utf-8"));

  return resFileData;
}

