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
  answer: number[][];
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

  const [status, setStatus] = useState<number[][]>(Array.from({length: resData.rowSize}, () => Array.from({length: resData.colSize}, () => 0)));
  const [answerString, setAnswerString] = useState<string>("");

  const fillCell = (row: number, col: number) => {
    let statusCopy = [...status];
    statusCopy[row][col] = status[row][col] === 1 ? 0 : 1;
    setStatus(statusCopy);
  }

  const checkCell = (row: number, col: number) => {
    let statusCopy = [...status];
    statusCopy[row][col] = status[row][col] === 2 ? 0 : 2;
    setStatus(statusCopy);
  }

  const clearCell = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let statusCopy = [...status];
    statusCopy.map((row: number[], rowIdx: number) => {
      row.map((col: number, colIdx: number) => {
        statusCopy[rowIdx][colIdx] = 0;
      })
    })
    setStatus(statusCopy);
    setAnswerString("");
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let isCorrect: boolean = true;

    for (let row: number = 0; isCorrect && row < resData.rowSize; row++) {
      for (let col: number = 0; isCorrect && col < resData.colSize; col++){
        if (resData.answer[row][col] === 0 && status[row][col] === 1 ||
            resData.answer[row][col] === 1 && status[row][col] !== 1) {
          isCorrect = false;
        }
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
      <h1 style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>{resData.title}</h1>
      <Board 
        rowSize={resData.rowSize} 
        colSize={resData.colSize} 
        hint={resData.hint}
        status={status}
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