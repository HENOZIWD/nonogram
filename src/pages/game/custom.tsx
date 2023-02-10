import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { IHintData } from "../lib/game";
import Board from "./board";

export default function Custom() {
  const [rowSize, setRowSize] = useState<number>(10);
  const [colSize, setColSize] = useState<number>(10);
  const [filledStatus, setFilledStatus] = useState<boolean[]>(Array(rowSize * colSize).fill(false));
  const [checkedStatus, setCheckedStatus] = useState<boolean[]>(Array(rowSize * colSize).fill(false));
  const [nonogramJson, setNonogramJson] = useState<string>("");

  const dummyHint: IHintData = {
    rowHint: [],
    colHint: [],
    rowHintMaxLength: 0,
    colHintMaxLength: 0
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

    setFilledStatus(Array(rowSize * colSize).fill(false));
    setCheckedStatus(Array(rowSize * colSize).fill(false));
  }

  const onRowSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (0 < event.target.valueAsNumber && event.target.valueAsNumber <= 50) {
      setRowSize(event.target.valueAsNumber);
    }
  }

  const onColSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (0 < event.target.valueAsNumber && event.target.valueAsNumber <= 50) {
      setColSize(event.target.valueAsNumber);
    }
  }

  // const onConvertNonogram = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   let rowhint;
  // }

  return (
    <>
    <Head>
      <title>Custom - Nonogram</title>
      <meta name="description" content="Make your own nonogram!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div style={{ minHeight: '100vh' }}>
      <h1 style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>Custom nonogram</h1>
      <Board
        rowSize={rowSize} 
        colSize={colSize} 
        hint={dummyHint}
        filledStatus={filledStatus}
        checkedStatus={checkedStatus}
        fillCell={fillCell}
        checkCell={checkCell}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        Row size<input type="range" min={1} max={50} value={rowSize} onChange={onRowSizeChange} />
        <p>{rowSize}</p>
        <br />
        Column size<input type="range" min={1} max={50} value={colSize} onChange={onColSizeChange} />
        <p>{colSize}</p>
        <br />
        <button type="button" onClick={clearCell}>Clear</button>
        <br />
        <button type="button">Convert JSON</button>
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