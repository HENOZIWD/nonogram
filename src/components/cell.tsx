import React, { useState } from 'react';
import styles from '@/styles/Cell.module.css'

interface ICellProps {
  status: number;
  fillCell: () => void;
  checkCell: () => void;
  color: string;
}

function Cell(props: ICellProps) {

  const onLeftClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.fillCell();
  }

  const onRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.checkCell();
  }

  return (
    <div 
      className={styles.cell}
      style={{ backgroundColor: props.status === 1 ? props.color : '#ffffff' }}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {props.status === 2 ? "❌" : ""}
    </div>
  )
}

function isStatusEqual(prevProps: ICellProps, nextProps: ICellProps) {
  return prevProps.status === nextProps.status;
}

export default React.memo(Cell, isStatusEqual);