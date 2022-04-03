import { ReactChild } from 'react'
import ElephantDataUntyped from '../data/elephant.json'
import styles from '../styles/Home.module.css'

export interface SelectedState {
  [row: number]: {
    [col: number]: string
  }
}

const ElephantData: SelectedState = ElephantDataUntyped

const WIDTH = 33
const HEIGHT = 35
const TL_X = 497
const TL_Y = 308

export default function Elephant() {
  function handleClick(i: number, j: number) {
    const url = `https://www.reddit.com/r/place/?cx=${TL_X + j}&cy=${TL_Y + i}&px=10`
    window.open(url, '_blank')?.focus()
  }

  const rows: ReactChild[] = []
  for (let i = 0; i < HEIGHT; i++) {
    const cells: ReactChild[] = []
    for (let j = 0; j < WIDTH; j++) {
      const cellClass = styles.cell
      const cellColor = ElephantData[i] && ElephantData[i][j] !== '' ? { background: ElephantData[i][j] } : {}
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
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://reddit.com/r/IndiaPlace">Reddit India Place Flag!</a>
      </h1>

      <p className={styles.description}>
        This is how we are going to draw the Elephant.
      </p>
      <p className={styles.description}>
        Click on any cell below, it will take you directly to the pixel on r/place that you need to fill in. Fill it in
        with the color of the cell you clicked on. <br /> Wait for 5 min and do it again!
      </p>
      <table className={styles.flag}>
        <tbody>{rows}</tbody>
      </table>
    </main>
  )
}
