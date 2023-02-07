import { useState } from 'react';
import styled from 'styled-components';

const Square = styled.div<{ checked: boolean }>`
  border: 1px solid white;
  width: 1rem;
  height: 1rem;
  text-align: center;
  font-size: 0.5rem;
  user-select: none;
  background-color: ${props => 
    props.checked ? '#000000' : '#ffffff'
  };
`

export default function Cell() {

  const [filled, setFilled] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const onLeftClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (checked) {
      setChecked(false);
    }
    setFilled(!filled);
  }

  const onRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (filled) {
      setFilled(false);
    }
    setChecked(!checked);
  }

  return (
    <Square 
      checked={filled}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {checked ? "🚩" : ""}
    </Square>
  )
}