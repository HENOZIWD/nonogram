import styled from 'styled-components';
import Cell from './cell';
import { IHintData } from '../lib/game';

const CellTable = styled.table`
  display: table;
  border: 2px solid green;
  border-collapse: collapse;
  margin: 0.5rem;
`

const GameTable = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
`

const Td = styled.td<{ index: number }>`
  border: 1px solid black;
  // Line bolding for easy-counting
  border-left: ${props => (props.index !== 0 && props.index % 5 === 0) ? 2 : 1}px solid black;
`

const Tr = styled.tr<{ index: number }>`
  // Line bolding for easy-counting
  border-top: ${props => (props.index !== 0 && props.index % 5 === 0) ? 2 : 1}px solid black;
`

const Hint = styled.td`
  width: 1rem;
  height: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
`

const ColHint = styled(Hint)<{ index: number }>`
  // Line bolding for easy-counting
  border-left: ${props => (props.index !== 0 && props.index % 5 === 0) ? 2 : 1}px solid black;
`

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
          <Hint key={hintCellIdx} style={{ border: 'none' }}>
          </Hint>
        );
      }
      for (let colIdx: number = 0; colIdx<colSize; colIdx++) {
        // Generate key of hint cell
        const hintCellIdx = (props.hint.colHintMaxLength - rowIdx - 1)*(props.hint.rowHintMaxLength + colSize) + rowSize*colSize + props.hint.rowHintMaxLength + colIdx;

        tdContainer.push(
          <ColHint 
            key={hintCellIdx}
            index={colIdx}
          >
            {(rowIdx < props.hint.colHint[colIdx].length) ? (
              props.hint.colHint[colIdx][props.hint.colHint[colIdx].length-1 - rowIdx]
            ) : (
              null
            )}
          </ColHint>
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
          <Hint key={hintCellIdx}>
            {(rowHintIdx < currentRowHintLength) ? (
              props.hint.rowHint[rowIdx][currentRowHintLength - rowHintIdx - 1]
            ) : (
              null
            )}
          </Hint>
        );
      }
      /* ============================================================================== */

      /* ============================ Board cell ================================= */
      for (let colIdx: number = 0; colIdx<colSize; colIdx++) {
        const cellIdx = rowIdx*colSize + colIdx;

        tdContainer.push(
          <Td 
            key={cellIdx}
            index={colIdx}
          >
            <Cell 
              filled={props.filledStatus[cellIdx]}
              checked={props.checkedStatus[cellIdx]}
              fillCell={() => props.fillCell(cellIdx)}
              checkCell={() => props.checkCell(cellIdx)}
            />
          </Td>
        );
      }

      trContainer.push(
        <Tr 
          key={rowIdx}
          index={rowIdx}
        >
          {tdContainer}
        </Tr>
      ); // {...tdContainer} Auto destructuring?
      /* =========================================================================== */

    }

    return trContainer;
  }

  const contextmenuPrevent = (event: React.MouseEvent<HTMLTableElement>) => {
    event.preventDefault();
  }

  return (
    <GameTable>
      <CellTable onContextMenu={contextmenuPrevent}>
        <tbody>
          { renderCell(props.rowSize, props.colSize) }
        </tbody>
      </CellTable>
    </GameTable>
  )
}