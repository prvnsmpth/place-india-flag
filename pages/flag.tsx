import { ReactChild, useState } from 'react'
import styles from '../styles/Home.module.css'

const WIDTH = 14
const HEIGHT = 14

interface SelectedState {
  [row: number]: {
    [col: number]: boolean
  }
}

const chakra = {
  '0': {
    '1': false,
    '2': false,
    '4': true,
    '5': true,
    '6': true,
    '7': true,
    '8': true,
    '9': true,
  },
  '1': {
    '2': true,
    '3': true,
    '4': true,
    '9': true,
    '10': true,
    '11': true,
  },
  '2': {
    '1': true,
    '2': true,
    '6': true,
    '7': true,
    '11': true,
    '12': true,
  },
  '3': {
    '1': true,
    '3': true,
    '4': true,
    '6': true,
    '7': true,
    '9': true,
    '10': true,
    '12': true,
    '13': false,
  },
  '4': {
    '0': true,
    '1': true,
    '3': true,
    '4': true,
    '5': true,
    '6': true,
    '7': true,
    '8': true,
    '9': true,
    '10': true,
    '12': true,
    '13': true,
  },
  '5': {
    '0': true,
    '4': true,
    '5': true,
    '8': true,
    '9': true,
    '13': true,
  },
  '6': {
    '0': true,
    '2': true,
    '3': true,
    '4': true,
    '6': true,
    '7': true,
    '9': true,
    '10': true,
    '11': true,
    '13': true,
  },
  '7': {
    '0': true,
    '2': true,
    '3': true,
    '4': true,
    '6': true,
    '7': true,
    '9': true,
    '10': true,
    '11': true,
    '13': true,
  },
  '8': {
    '0': true,
    '4': true,
    '5': true,
    '8': true,
    '9': true,
    '13': true,
  },
  '9': {
    '0': true,
    '1': true,
    '3': true,
    '4': true,
    '5': true,
    '6': true,
    '7': true,
    '8': true,
    '9': true,
    '10': true,
    '12': true,
    '13': true,
  },
  '10': {
    '1': true,
    '3': true,
    '4': true,
    '6': true,
    '7': true,
    '9': true,
    '10': true,
    '12': true,
  },
  '11': {
    '1': true,
    '2': true,
    '6': true,
    '7': true,
    '11': true,
    '12': true,
  },
  '12': {
    '2': true,
    '3': true,
    '4': true,
    '9': true,
    '10': true,
    '11': true,
  },
  '13': {
    '4': true,
    '5': true,
    '6': true,
    '7': true,
    '8': true,
    '9': true,
  },
}

const TL_X = 260
const TL_Y = 315

export default function Flag() {
  const [selected, setSelected] = useState<SelectedState>(chakra)

  // function handleClick(evt: React.MouseEvent<HTMLElement>, i: number, j: number) {
  //   console.log(`Clicking on ${i} ${j}`)
  //   setSelected((prevState) => ({
  //     ...prevState,
  //     [i]: { ...prevState[i], [j]: prevState[i] ? !prevState[i][j] : true },
  //   }))
  // }

  function handleClick(i: number, j: number) {
    const url = `https://www.reddit.com/r/place/?cx=${TL_X + j}&cy=${TL_Y + i}&px=10`
    window.open(url, '_blank')?.focus()
  }

  const rows: ReactChild[] = []
  for (let i = 0; i < HEIGHT; i++) {
    const cells: ReactChild[] = []
    for (let j = 0; j < WIDTH; j++) {
      const cellClass = `${styles.cell} ${selected[i] && selected[i][j] ? styles.selected : ''}`
      cells[j] = (
        <td
          key={`${i}-${j}`}
          className={cellClass}
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
