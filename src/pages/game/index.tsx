import Board from './board';
import { useState } from 'react';
import Link from 'next/link';
import { IHintData } from './board';

export default function Game() {

  const [filledStatus, setFilledStatus] = useState<boolean[]>(Array(100).fill(false));
  const [checkedStatus, setCheckedStatus] = useState<boolean[]>(Array(100).fill(false));

  const rowHint: number[][] = [[2, 2], [1, 1, 1], [1, 1], [1, 1], [1, 1], [1]];
  const colHint: number[][] = [[2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2]];
  const rowHintMaxLength: number = 3;
  const colHintMaxLength: number = 2;

  const hint: IHintData = {
    rowHint: rowHint,
    colHint: colHint,
    rowHintMaxLength: rowHintMaxLength,
    colHintMaxLength: colHintMaxLength
  };

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
        rowSize={6} 
        colSize={7} 
        hint={hint}
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