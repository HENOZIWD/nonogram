import Board from './board';
import { useState } from 'react';
import Link from 'next/link';

export default function Game() {

  const [filledStatus, setFilledStatus] = useState<boolean[]>(Array(100).fill(false));
  const [checkedStatus, setCheckedStatus] = useState<boolean[]>(Array(100).fill(false));

  const rowHint: number[][] = [[2, 2], [1, 1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1]];
  const colHint: number[][] = [[2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2]];
  const rowHintMaxLength: number = 2;
  const colHintMaxLength: number = 2;

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

  return (
    <div style={{ minHeight: '100vh'}}>
      <h1 style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>nonogram</h1>
      <Board 
        rowSize={6} 
        colSize={7} 
        rowHint={rowHint}
        colHint={colHint}
        rowHintMaxLength={rowHintMaxLength}
        colHintMaxLength={colHintMaxLength}
        filledStatus={filledStatus}
        checkedStatus={checkedStatus}
        fillCell={fillCell}
        checkCell={checkCell}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link
            href={'/'}
          >
            Back to Home
          </Link>
      </div>
    </div>
  )
}