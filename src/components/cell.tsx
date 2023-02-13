import { useState } from 'react';
import styles from '@/styles/Cell.module.css'

interface ICellProps {
  filled: boolean;
  checked: boolean;
  fillCell: () => void;
  checkCell: () => void;
  color: string;
}

export default function Cell(props: ICellProps) {

  const onLeftClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.fillCell();

    // console.log("Left Click");
  }

  const onRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.checkCell();

    // console.log("Right Click");
  }

  return (
    <div 
      className={styles.cell}
      style={{ backgroundColor: props.filled ? props.color : '#ffffff' }}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {props.checked ? "❌" : ""}
    </div>
  )
}