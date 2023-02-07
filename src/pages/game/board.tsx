import Link from 'next/link';
import styled from 'styled-components';
import Cell from './cell';

const CellTable = styled.table`
  display: table;
  border: 1px solid black;
  border-collapse: collapse;
`

export default function Board() {

  return (
    <div style={{ minHeight: '100vh' }}>
      <Link
        href={'/'}
      >
        Back to Home
      </Link>
      <CellTable>
        <tbody>
          <tr>
            <td><Cell /></td>
            <td><Cell /></td>
            <td><Cell /></td>
          </tr>
          <tr>
            <td><Cell /></td>
            <td><Cell /></td>
            <td><Cell /></td>
          </tr>
          <tr>
            <td><Cell /></td>
            <td><Cell /></td>
            <td><Cell /></td>
          </tr>
        </tbody>
      </CellTable>
    </div>
  )
}