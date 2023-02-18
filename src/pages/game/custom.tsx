import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IHintData } from './[id]';
import Board from '@/components/board';
import ReactModal from 'react-modal';

interface ICustomData {
  rowSize: number;
  colSize: number;
  status: number[][];
}

ReactModal.setAppElement('#__next');

export default function Custom() {
  const [customData, setCustomData] = useState<ICustomData>(
    {
      rowSize: 0,
      colSize: 0,
      status: []
    }
  );
  const [nonogramJson, setNonogramJson] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  const selectSize = (customLength: number) => {
    setCustomData(
      {
        rowSize: customLength,
        colSize: customLength,
        status: Array.from({length: customLength}, () => Array.from({length: customLength}, () => 0))
      }
    );
    setModalIsOpen(false);
  }

  const dummyHint: IHintData = {
    rowHint: [],
    colHint: [],
    rowHintMaxLength: 0,
    colHintMaxLength: 0
  };

  const fillCell = (row: number, col: number) => {
    let statusCopy = [...customData.status];
    statusCopy[row][col] = customData.status[row][col] === 1 ? 0 : 1;
    setCustomData({...customData, status: statusCopy});
  }

  const checkCell = (row: number, col: number) => {
    let statusCopy = [...customData.status];
    statusCopy[row][col] = customData.status[row][col] === 2 ? 0 : 2;
    setCustomData({...customData, status: statusCopy});
  }

  const clearCell = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let statusCopy = [...customData.status];
    statusCopy.map((row: number[], rowIdx: number) => {
      row.map((col: number, colIdx: number) => {
        statusCopy[rowIdx][colIdx] = 0;
      })
    })
    setCustomData({...customData, status: statusCopy});
  }

  const onConvertNonogram = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let rowHintContainer: number[][] = [];
    let colHintContainer: number[][] = [];
    let rowHintMaxLength: number = 0;
    let colHintMaxLength: number = 0;

    for (let rowIdx: number = 0; rowIdx < customData.rowSize; rowIdx++) {
      let currentRowHint: number[] = [];
      let continuousFilledCount = 0;
      for (let colIdx: number = 0; colIdx < customData.colSize; colIdx++) {
        if (customData.status[rowIdx][colIdx] === 1) {
          continuousFilledCount++;
        }
        else if (continuousFilledCount > 0) {
          currentRowHint.push(continuousFilledCount);
          continuousFilledCount = 0;
        }
      }

      if (continuousFilledCount > 0) {
        currentRowHint.push(continuousFilledCount);
      }

      if (rowHintMaxLength < currentRowHint.length) {
        rowHintMaxLength = currentRowHint.length;
      }

      rowHintContainer.push(currentRowHint);
    }

    for (let colIdx: number = 0; colIdx < customData.colSize; colIdx++) {
      let currentColHint: number[] = [];
      let continuousFilledCount = 0;
      for (let rowIdx: number = 0; rowIdx < customData.colSize; rowIdx++) {
        if (customData.status[rowIdx][colIdx] === 1) {
          continuousFilledCount++;
        }
        else if (continuousFilledCount > 0) {
          currentColHint.push(continuousFilledCount);
          continuousFilledCount = 0;
        }
      }

      if (continuousFilledCount > 0) {
        currentColHint.push(continuousFilledCount);
      }

      if (colHintMaxLength < currentColHint.length) {
        colHintMaxLength = currentColHint.length;
      }

      colHintContainer.push(currentColHint);
    }

    rowHintContainer.map((rowHint: number[]) => {
      const currentLength = rowHint.length;
      for (let i: number = 0; i < rowHintMaxLength - currentLength; i++) {
        rowHint.unshift(0);
      }
    })

    colHintContainer.map((colHint: number[]) => {
      const currentLength = colHint.length;
      for (let i: number = 0; i < colHintMaxLength - currentLength; i++) {
        colHint.unshift(0);
      }
    })

    const transposedColHint = colHintContainer[0].map((col: number, colIdx: number) => (
      colHintContainer.map((row: number[], rowIdx: number) => (
        row[colIdx]
      ))
    ));

    const hint: IHintData = {
      rowHint: rowHintContainer,
      colHint: transposedColHint,
      rowHintMaxLength: rowHintMaxLength,
      colHintMaxLength: colHintMaxLength
    };

    const convertedData = {
      rowSize: customData.rowSize,
      colSize: customData.colSize,
      answer: customData.status,
      hint: hint
    };

    setNonogramJson(JSON.stringify(convertedData, null, " "));
  }

  return (
    <>
    <Head>
      <title>Custom - Nonogram</title>
      <meta name="description" content="Make your own nonogram!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div style={{ minHeight: '100vh' }}>
      <ReactModal
        isOpen={modalIsOpen}
        style={{ content: { top: '40%', left: '40%', right: 'auto', bottom: 'auto' } }}
        contentLabel="Select nonogram size"
      >
        <button type="button" onClick={() => selectSize(5)}>5x5</button>
        <button type="button" onClick={() => selectSize(10)}>10x10</button>
        <button type="button" onClick={() => selectSize(15)}>15x15</button>
        <button type="button" onClick={() => selectSize(25)}>25x25</button>
        <button type="button" onClick={() => selectSize(50)}>50x50</button>
        <button type="button" onClick={() => selectSize(100)}>100x100</button>
      </ReactModal>
      <h1 style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>Custom nonogram</h1>
      <Board
        rowSize={customData.rowSize} 
        colSize={customData.colSize} 
        hint={dummyHint}
        status={customData.status}
        fillCell={fillCell}
        checkCell={checkCell}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <button type="button" onClick={clearCell}>Clear</button>
        <br />
        <button type="button" onClick={onConvertNonogram}>Convert JSON</button>
        <br />
        <Link
          href={'/'}
        >
          Back to Home
        </Link>
        <br />
        <p>{nonogramJson}</p>
      </div>
    </div>
    </>
  )
}