import Board from '@/components/board';
import { useState } from 'react';
import Link from 'next/link';
import { getGameResourceIds, getGameResource } from '@/lib/game';
import Head from 'next/head';

export interface IHintData {
  rowHint: number[][];
  colHint: number[][];
  rowHintMaxLength: number;
  colHintMaxLength: number;
}

export interface IResourceData {
  title: string;
  description: string;
  rowSize: number;
  colSize: number;
  answer: boolean[];
  hint: IHintData;
}

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
  const [answerString, setAnswerString] = useState<string>("");

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

    setFilledStatus(Array(resData.rowSize * resData.colSize).fill(false));
    setCheckedStatus(Array(resData.rowSize * resData.colSize).fill(false));
    setAnswerString("");
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let isCorrect: boolean = true;

    for (let i: number = 0; i < resData.rowSize*resData.colSize; i++) {
      if (filledStatus[i] !== resData.answer[i]) {
        isCorrect = false;
        break;
      }
    }

    setAnswerString(isCorrect ? "Correct!" : "Wrong!");
  }

  return (
    <>
    <Head>
      <title>{`${resData.title} - Nonogram`}</title>
      <meta name="description" content={resData.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div style={{ minHeight: '100vh'}}>
      <h1 style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>Nonogram</h1>
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
        <button type="button" onClick={clearCell}>Clear</button>
        <br />
        <button type="button" onClick={checkAnswer}>Submit</button>
        <h2>{answerString}</h2>
        <br />
        <Link
          href={'/'}
        >
          Back to Home
        </Link>
      </div>
    </div>
    </>
  )
}