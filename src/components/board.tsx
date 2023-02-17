import { IHintData } from '@/pages/game/[id]';
import styles from '@/styles/Board.module.css';
import Cell from './cell';
import React from 'react';

interface IBoardProps {
  rowSize: number;
  colSize: number;
  hint: IHintData;
  status: number[][];
  fillCell: (row: number, col: number) => void;
  checkCell: (row: number, col: number) => void;
}

export default function Board(props: IBoardProps) {

  const contextmenuPrevent = (event: React.MouseEvent<HTMLTableElement>) => {
    event.preventDefault();
  }

  return (
    <div className={styles.gameTable}>
      <div className={styles.grid}>
        {/* empty div for grid */}
        <div>
        </div>
        {/* ---------------------- Column Hint ------------------- */}
        <table
          className={styles.cellTable}
          onContextMenu={contextmenuPrevent}
        >
          <tbody>
            {props.hint.colHint.map((row: number[], rowIdx: number) => (
              <tr key={rowIdx}>
                {row.map((hintNum: number, hintIdx: number) => (
                  <td 
                    className={styles.hint}
                    key={hintIdx}
                    style={{ borderLeft: `${(hintIdx % 5 === 0 && hintIdx !== 0) ? 2 : 1}px solid black` }}
                  >
                    {hintNum === 0 ? " " : hintNum}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* ---------------------- Row Hint ------------------- */}
        <table
          className={styles.cellTable}
          onContextMenu={contextmenuPrevent}
        >
          <tbody>
            {props.hint.rowHint.map((row: number[], rowIdx: number) => (
              <tr 
                key={rowIdx}
                style={{ borderTop: `${(rowIdx % 5 === 0 && rowIdx !== 0) ? 2 : 1}px solid black` }}
              >
                {row.map((hintNum: number, hintIdx: number) => (
                  <td 
                    className={styles.hint}
                    key={hintIdx}
                  >
                    {hintNum === 0 ? " " : hintNum}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* ------------------------ Cell ------------------------*/}
        <table 
          className={styles.cellTable}
          onContextMenu={contextmenuPrevent}
        >
          <tbody>
            {props.status.map((row: number[], rowIdx: number) => (
              <tr 
                key={rowIdx}
                style={{ borderTop: `${(rowIdx % 5 === 0 && rowIdx !== 0) ? 2 : 1}px solid black` }}
              >
                {row.map((col: number, colIdx: number) => (
                  <td 
                    key={colIdx}
                    style={{ borderLeft: `${(colIdx % 5 === 0 && colIdx !== 0) ? 2 : 1}px solid black` }}
                  >
                    <Cell
                      status={props.status[rowIdx][colIdx]}
                      fillCell={() => props.fillCell(rowIdx, colIdx)}
                      checkCell={() => props.checkCell(rowIdx, colIdx)} 
                      color='#000000'
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

