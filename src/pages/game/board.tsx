import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Cell from './cell';

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

const Td = styled.td`
  border: 1px solid black;
`

const FifthTd = styled(Td)`
  border-left: 2px solid black;
`

const FifthTr = styled.tr`
  border-top: 2px solid black;
`

const Hint = styled.td`
  width: 1rem;
  height: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
`

const ColHint = styled(Hint)`
  border-left: 1px solid black;
`

const FifthColHint = styled(Hint)`
  border-left: 2px solid black;
`

const RowHint = styled(Hint)`
  border-Top: 1px solid black;
`

interface IBoardProps {
  rowSize: number;
  colSize: number;
  rowHint: number[][];
  colHint: number[][];
  rowHintMaxLength: number;
  colHintMaxLength: number;
  filledStatus: boolean[];
  checkedStatus: boolean[];
  fillCell: (i: number) => void;
  checkCell: (i: number) => void;
}

export default function Board(props: IBoardProps) {

  const renderCell = (rowSize: number, colSize: number) => {

    let trContainer: JSX.Element[] = [];

    /* ============================= Column hint cell ================================ */
    for (let rowIdx: number = props.colHintMaxLength-1; rowIdx >= 0; rowIdx--) {
      let tdContainer: JSX.Element[] = [];

      for (let i: number=0; i<props.rowHintMaxLength; i++) {
        // Generate key of hint cell
        const hintCellIdx = (props.colHintMaxLength - rowIdx - 1)*(props.rowHintMaxLength + colSize) + rowSize*colSize + i;

        tdContainer.push(
          <Hint key={hintCellIdx} style={{ border: 'none' }}>
          </Hint>
        );
      }
      for (let colIdx: number = 0; colIdx<colSize; colIdx++) {
        // Generate key of hint cell
        const hintCellIdx = (props.colHintMaxLength - rowIdx - 1)*(props.rowHintMaxLength + colSize) + rowSize*colSize + props.rowHintMaxLength + colIdx;

        if (colIdx !== 0 && colIdx % 5 === 0) { // Line bolding for easy-counting
          if (rowIdx < props.colHint[colIdx].length) {
            tdContainer.push(
              <FifthColHint key={hintCellIdx}>
                {props.colHint[colIdx][props.colHint[colIdx].length-1 - rowIdx]}
              </FifthColHint>
            );
          }
          else {
            tdContainer.push(
              <FifthColHint key={hintCellIdx}>
              </FifthColHint>
            );
          }
        }
        else {
          if (rowIdx < props.colHint[colIdx].length) {
            tdContainer.push(
              <ColHint key={hintCellIdx}>
                {props.colHint[colIdx][props.colHint[colIdx].length-1 - rowIdx]}
              </ColHint>
            );
          }
          else {
            tdContainer.push(
              <ColHint key={hintCellIdx}>
              </ColHint>
            );
          }
        }
      }

      trContainer.push(
        <tr key={rowSize + (props.colHintMaxLength - rowIdx - 1)}>
          {tdContainer}
        </tr>
      );
    }
    /* =================================================================================== */

    for (let rowIdx: number = 0; rowIdx<rowSize; rowIdx++) {
      let tdContainer: JSX.Element[] = [];

      /* ============================== Row hint cell =============================== */
      for (let rowHintIdx: number = props.rowHintMaxLength-1; rowHintIdx >= 0; rowHintIdx--) {
        // Generate key of hint cell
        const hintCellIdx = rowSize*colSize + props.colHintMaxLength*(props.rowHintMaxLength + colSize) + rowIdx*props.rowHintMaxLength + (props.rowHintMaxLength - rowHintIdx - 1);

        if (rowHintIdx < props.rowHint[rowIdx].length) {
          tdContainer.push(
            <RowHint key={hintCellIdx}>
              {props.rowHint[rowIdx][rowHintIdx]}
            </RowHint>
          );
        }
        else {
          tdContainer.push(
            <RowHint key={hintCellIdx}>
            </RowHint>
          );
        }
      }
      /* ============================================================================== */

      /* ============================ Board cell ================================= */
      for (let colIdx: number = 0; colIdx<colSize; colIdx++) {
        const cellIdx = rowIdx*colSize + colIdx;

        if (colIdx !== 0 && colIdx % 5 === 0) { // Line bolding for easy-counting
          tdContainer.push(
            <FifthTd key={cellIdx}>
              <Cell 
                filled={props.filledStatus[cellIdx]}
                checked={props.checkedStatus[cellIdx]}
                fillCell={() => props.fillCell(cellIdx)}
                checkCell={() => props.checkCell(cellIdx)}
              />
            </FifthTd>
          );
        }
        else {
          tdContainer.push(
            <Td key={cellIdx}>
              <Cell 
                filled={props.filledStatus[cellIdx]}
                checked={props.checkedStatus[cellIdx]}
                fillCell={() => props.fillCell(cellIdx)}
                checkCell={() => props.checkCell(cellIdx)}
              />
            </Td>
          );
        }
      }

      if (rowIdx !== 0 && rowIdx % 5 === 0) { // Line bolding for easy-counting
        trContainer.push(
          <FifthTr key={rowIdx}>
            {tdContainer}
          </FifthTr>
        );
      }
      else {
        trContainer.push(
          <tr key={rowIdx}>
            {tdContainer}
          </tr>
        );
        // trContainer.push(<tr>{...tdContainer}</tr>);
        // auto destructuring?
      }
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