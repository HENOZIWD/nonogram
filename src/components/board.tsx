import Cell from './cell';
import { IHintData } from '@/pages/game/[id]';
import styles from '@/styles/Board.module.css'

interface IBoardProps {
  rowSize: number;
  colSize: number;
  hint: IHintData;
  filledStatus: boolean[];
  checkedStatus: boolean[];
  fillCell: (i: number) => void;
  checkCell: (i: number) => void;
}

export default function Board(props: IBoardProps) {

  const renderCell = (rowSize: number, colSize: number) => {

    let trContainer: JSX.Element[] = [];

    /* ============================= Column hint cell ================================ */
    for (let rowIdx: number = props.hint.colHintMaxLength-1; rowIdx >= 0; rowIdx--) {
      let tdContainer: JSX.Element[] = [];

      for (let i: number=0; i<props.hint.rowHintMaxLength; i++) {
        // Generate key of hint cell
        const hintCellIdx = (props.hint.colHintMaxLength - rowIdx - 1)*(props.hint.rowHintMaxLength + colSize) + rowSize*colSize + i;

        tdContainer.push( // Empty hint that located top-left corner
          <td className={styles.hint} key={hintCellIdx} style={{ border: 'none' }}>
          </td>
        );
      }
      for (let colIdx: number = 0; colIdx<colSize; colIdx++) {
        // Generate key of hint cell
        const hintCellIdx = (props.hint.colHintMaxLength - rowIdx - 1)*(props.hint.rowHintMaxLength + colSize) + rowSize*colSize + props.hint.rowHintMaxLength + colIdx;

        tdContainer.push(
          <td
            key={hintCellIdx}
            className={styles.hint}
            style={{ borderLeft: `${(colIdx !== 0 && colIdx % 5 === 0) ? 2 : 1}px solid black` }}
          >
            {(rowIdx < props.hint.colHint[colIdx].length) ? (
              props.hint.colHint[colIdx][props.hint.colHint[colIdx].length-1 - rowIdx]
            ) : (
              null
            )}
          </td>
        )
      }

      trContainer.push(
        <tr key={rowSize + (props.hint.colHintMaxLength - rowIdx - 1)}>
          {tdContainer}
        </tr>
      );
    }
    /* =================================================================================== */

    for (let rowIdx: number = 0; rowIdx<rowSize; rowIdx++) {
      let tdContainer: JSX.Element[] = [];

      /* ============================== Row hint cell =============================== */
      for (let rowHintIdx: number = props.hint.rowHintMaxLength-1; rowHintIdx >= 0; rowHintIdx--) {
        const currentRowHintLength = props.hint.rowHint[rowIdx].length;
        // Generate key of hint cell
        const hintCellIdx = rowSize*colSize + props.hint.colHintMaxLength*(props.hint.rowHintMaxLength + colSize) + rowIdx*props.hint.rowHintMaxLength + (props.hint.rowHintMaxLength - rowHintIdx - 1);

        tdContainer.push(
          <td 
            key={hintCellIdx}
            className={styles.hint}
          >
            {(rowHintIdx < currentRowHintLength) ? (
              props.hint.rowHint[rowIdx][currentRowHintLength - rowHintIdx - 1]
            ) : (
              null
            )}
          </td>
        );
      }
      /* ============================================================================== */

      /* ============================ Board cell ================================= */
      for (let colIdx: number = 0; colIdx<colSize; colIdx++) {
        const cellIdx = rowIdx*colSize + colIdx;

        tdContainer.push(
          <td 
            key={cellIdx}
            style={{ 
              border: '1px solid black',
              borderLeft: `${(colIdx !== 0 && colIdx % 5 === 0) ? 2 : 1}px solid black`}}
          >
            <Cell 
              filled={props.filledStatus[cellIdx]}
              checked={props.checkedStatus[cellIdx]}
              fillCell={() => props.fillCell(cellIdx)}
              checkCell={() => props.checkCell(cellIdx)}
              color={'#000000'}
            />
          </td>
        );
      }

      trContainer.push(
        <tr 
          key={rowIdx}
          style={{ borderTop: `${(rowIdx !== 0 && rowIdx % 5 === 0) ? 2 : 1}px solid black` }}
        >
          {tdContainer}
        </tr>
      ); // {...tdContainer} Auto destructuring?
      /* =========================================================================== */

    }

    return trContainer;
  }

  const contextmenuPrevent = (event: React.MouseEvent<HTMLTableElement>) => {
    event.preventDefault();
  }

  return (
    <div className={styles.gameTable}>
      <table 
        className={styles.cellTable}
        onContextMenu={contextmenuPrevent}
      >
        <tbody>
          { renderCell(props.rowSize, props.colSize) }
        </tbody>
      </table>
    </div>
  )
}