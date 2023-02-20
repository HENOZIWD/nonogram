import React, { useState } from 'react';
import styles from '@/styles/Cell.module.css'

interface ICellProps {
  status: number;
  fillCell: () => void;
  checkCell: () => void;
  eraseCell: () => void;
  color: string;
  dragStatus: React.MutableRefObject<number>;
}

function Cell(props: ICellProps) {

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.button === 0) {
      (props.status !== 1) ? props.fillCell() : props.eraseCell();
    }
    else if (event.button === 2) {
      (props.status !== 2) ? props.checkCell() : props.eraseCell();
    }
  }

  const onDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    // console.log(props.dragStatus.current);

    if (event.buttons === 1) {
      (props.dragStatus.current === 1) ? props.fillCell() : props.eraseCell();
    }
    else if (event.buttons === 2) {
      (props.dragStatus.current === 2) ? props.checkCell() : props.eraseCell();
    }
  }

  return (
    <div 
      className={styles.cell}
      style={{ backgroundColor: props.status === 1 ? props.color : '#ffffff' }}
      onMouseDown={onClick}
      onMouseEnter={onDrag}
    >
      {props.status === 2 ? "❌" : ""}
    </div>
  )
}

function isStatusEqual(prevProps: ICellProps, nextProps: ICellProps) {
  return prevProps.status === nextProps.status;
}

export default React.memo(Cell, isStatusEqual);