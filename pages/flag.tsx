import { ReactChild, useState } from 'react'
import styles from '../styles/Home.module.css'

const WIDTH = 14
const HEIGHT = 14

export interface SelectedState {
  [row: number]: {
    [col: number]: string
  }
}

const chakra = {
 '0': {
    '1': "white",
    '2': "white",
    '4': "darkblue",
    '5': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '8': "darkblue",
    '9': "darkblue",
  },
  '1': {
    '2': "darkblue",
    '3': "darkblue",
    '4': "darkblue",
    '9': "darkblue",
    '10': "darkblue",
    '11': "darkblue",
  },
  '2': {
    '1': "darkblue",
    '2': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '11': "darkblue",
    '12': "darkblue",
  },
  '3': {
    '1': "darkblue",
    '3': "darkblue",
    '4': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '9': "darkblue",
    '10': "darkblue",
    '12': "darkblue",
    '13': "white",
  },
  '4': {
    '0': "darkblue",
    '1': "darkblue",
    '3': "darkblue",
    '4': "darkblue",
    '5': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '8': "darkblue",
    '9': "darkblue",
    '10': "darkblue",
    '12': "darkblue",
    '13': "darkblue",
  },
  '5': {
    '0': "darkblue",
    '4': "darkblue",
    '5': "darkblue",
    '8': "darkblue",
    '9': "darkblue",
    '13': "darkblue",
  },
  '6': {
    '0': "darkblue",
    '2': "darkblue",
    '3': "darkblue",
    '4': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '9': "darkblue",
    '10': "darkblue",
    '11': "darkblue",
    '13': "darkblue",
  },
  '7': {
    '0': "darkblue",
    '2': "darkblue",
    '3': "darkblue",
    '4': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '9': "darkblue",
    '10': "darkblue",
    '11': "darkblue",
    '13': "darkblue",
  },
  '8': {
    '0': "darkblue",
    '4': "darkblue",
    '5': "darkblue",
    '8': "darkblue",
    '9': "darkblue",
    '13': "darkblue",
  },
  '9': {
    '0': "darkblue",
    '1': "darkblue",
    '3': "darkblue",
    '4': "darkblue",
    '5': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '8': "darkblue",
    '9': "darkblue",
    '10': "darkblue",
    '12': "darkblue",
    '13': "darkblue",
  },
  '10': {
    '1': "darkblue",
    '3': "darkblue",
    '4': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '9': "darkblue",
    '10': "darkblue",
    '12': "darkblue",
  },
  '11': {
    '1': "darkblue",
    '2': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '11': "darkblue",
    '12': "darkblue",
  },
  '12': {
    '2': "darkblue",
    '3': "darkblue",
    '4': "darkblue",
    '9': "darkblue",
    '10': "darkblue",
    '11': "darkblue",
  },
  '13': {
    '4': "darkblue",
    '5': "darkblue",
    '6': "darkblue",
    '7': "darkblue",
    '8': "darkblue",
    '9': "darkblue",
  },
}

const TL_X = 375
const TL_Y = 316

export default function Flag() {
  const [selected, setSelected] = useState<SelectedState>(chakra)

  function handleClick(i: number, j: number) {
    const url = `https://www.reddit.com/r/place/?cx=${TL_X + j}&cy=${TL_Y + i}&px=10`
    window.open(url, '_blank')?.focus()
  }

  const rows: ReactChild[] = []
  for (let i = 0; i < HEIGHT; i++) {
    const cells: ReactChild[] = []
    for (let j = 0; j < WIDTH; j++) {
      const cellClass = styles.cell
      const cellColor = selected[i] && selected[i][j] !== "" ? { background: selected[i][j] } : {}
      cells[j] = (
        <td
          key={`${i}-${j}`}
          className={cellClass}
          style={cellColor}
          onClick={() => handleClick(i, j)}
          title={`(${TL_X + j}, ${TL_Y + i})`}
        ></td>
      )
    }
    rows.push(
      <tr key={`row-${i}`} className={styles.row}>
        {cells}
      </tr>
    )
  }

  return (
    <table className={styles.flag}>
      <tbody>{rows}</tbody>
    </table>
  )
}
