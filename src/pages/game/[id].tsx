import Board from '@/components/board';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getGameResourceIds, getGameResource } from '@/lib/game';
import Head from 'next/head';
import styles from '@/styles/Game.module.css';

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
  const dragStatus = useRef<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [record, setRecord] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [])

  const fillCell = (row: number, col: number) => {
    dragStatus.current = 1;
    let statusCopy = [...status];
    statusCopy[row][col] = 1;
    setStatus(statusCopy);
  }

  const checkCell = (row: number, col: number) => {
    dragStatus.current = 2;
    let statusCopy = [...status];
    statusCopy[row][col] = 2;
    setStatus(statusCopy);
  }

  const eraseCell = (row: number, col: number) => {
    dragStatus.current = 0;
    let statusCopy = [...status];
    statusCopy[row][col] = 0;
    setStatus(statusCopy);
  }

  const clearBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    
    if (isCorrect) {
      setAnswerString("Correct!");
      setRecord(timer);
    }
    else {
      setAnswerString("Wrong!");
    }
  }

  return (
    <>
    <Head>
      <title>{`${resData.title} - Nonogram`}</title>
      <meta name="description" content={resData.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.game}>
      <h1>{resData.title}</h1>
      <Board 
        rowSize={resData.rowSize} 
        colSize={resData.colSize} 
        hint={resData.hint}
        status={status}
        fillCell={fillCell}
        checkCell={checkCell}
        eraseCell={eraseCell}
        dragStatus={dragStatus}
      />
      <div className={styles.info}>
        <div>{Math.floor(timer/60)}&#58;{timer%60 < 10 ? `0${timer%60}` : timer%60}</div>
        <br />
        <button type="button" onClick={clearBoard}>Clear</button>
        <br />
        <button type="button" onClick={checkAnswer}>Submit</button>
        <h2>
          {answerString}{answerString === "Correct!" && <div>Record&#58; {Math.floor(record/60)}:{record%60 < 10 ? `0${record%60}` : record%60}</div>}
        </h2>
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