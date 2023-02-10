import Board from './board';
import { useState } from 'react';
import Link from 'next/link';
import { getGameResource, getGameResourceIds, IHintData, IResourceData } from '../lib/game';

export async function getStaticPaths() {
  const resFileIds = getGameResourceIds();

  return {
    paths: resFileIds,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: {id: string} }) {
  const resData = await getGameResource(params.id);

  return {
    props: resData,
  }
}

export default function Game(resData: IResourceData) {

  const [filledStatus, setFilledStatus] = useState<boolean[]>(Array(resData.rowSize * resData.colSize).fill(false));
  const [checkedStatus, setCheckedStatus] = useState<boolean[]>(Array(resData.rowSize * resData.colSize).fill(false));

  const fillCell = (i: number) => {
    if (checkedStatus[i]) {
      
      let checkedCopy = checkedStatus.slice();
      checkedCopy[i] = false;
      setCheckedStatus(checkedCopy);
    }

    let filledCopy = filledStatus.slice();
    filledCopy[i] = !filledStatus[i];
    setFilledStatus(filledCopy);

    // console.log("Fill " + i);
  }

  const checkCell = (i: number) => {
    if (filledStatus[i]) {

      let filledCopy = filledStatus.slice();
      filledCopy[i] = false;
      setFilledStatus(filledCopy);
    }

    let checkedCopy = checkedStatus.slice();
    checkedCopy[i] = !checkedStatus[i];
    setCheckedStatus(checkedCopy);

    // console.log("Check " + i);
  }

  const clearCell = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setFilledStatus(Array(100).fill(false));
    setCheckedStatus(Array(100).fill(false));
  }

  return (
    <div style={{ minHeight: '100vh'}}>
      <h1 style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>nonogram</h1>
      <Board 
        rowSize={resData.rowSize} 
        colSize={resData.colSize} 
        hint={resData.hint}
        filledStatus={filledStatus}
        checkedStatus={checkedStatus}
        fillCell={fillCell}
        checkCell={checkCell}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button type="button" onClick={clearCell}>clear</button>
        <br />
        <Link
          href={'/'}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}