import * as fs from 'fs';
import path from 'path';

import { IGameCard } from '@/pages';
import { IResourceData } from '@/pages/game/[id]';

const resDir = path.join(process.cwd(), "resources");

export function getGameResourceIds(): { params: {id: string} }[] {
  const resFileNames = fs.readdirSync(resDir);

  return resFileNames.map((id: string): { params: {id: string} } => {
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

export async function getAllGameCards(): Promise<IGameCard[]> {
  const resFileNames = fs.readdirSync(resDir);
  const resFileIds = resFileNames.map((name: string) => {

    return name.replace(/\.json$/, '');
  });

  const allGameCardsData: IGameCard[] = await Promise.all(resFileIds.map(async (id: string): Promise<IGameCard> => {
    const resFileData = await getGameResource(id);

    return {
      id: id,
      title: resFileData.title,
      description: resFileData.description
    };
  }));

  return allGameCardsData;
}

