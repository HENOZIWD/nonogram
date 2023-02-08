import { useState } from 'react';
import styled from 'styled-components';

const Square = styled.div<{ filled: boolean }>`
  border: 1px solid white;
  width: 1rem;
  height: 1rem;
  text-align: center;
  font-size: 0.5rem;
  user-select: none;
  background-color: ${props => 
    props.filled ? '#000000' : '#ffffff'
  };
`

interface ICellProps {
  filled: boolean;
  checked: boolean;
  fillCell: () => void;
  checkCell: () => void;
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
    <Square 
      filled={props.filled}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {props.checked ? "🚩" : ""}
    </Square>
  )
}