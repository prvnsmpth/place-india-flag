import React, { ReactChild, useState } from 'react'
import styles from '../styles/Home.module.css'

const WIDTH = 12
const HEIGHT = 24

interface SelectedState {
  [row: number]: {
    [col: number]: string // the color of the cell, empty string indicates no color
  }
}

const TL_X = 287
const TL_Y = 302

const Colors = [
  'red',
  'orange',
  'yellow',
  'darkgreen',
  'lightgreen',
  'darkblue',
  'blue',
  'lightblue',
  'darkpurple',
  'purple',
  'lightpink',
  'brown',
  'black',
  'grey',
  'white',
]

export default function GenerateFlag() {
  const [widthStr, setWidthStr] = useState<string>(WIDTH.toString())
  const [heightStr, setHeightStr] = useState<string>(HEIGHT.toString())

  const [showState, setShowState] = useState<boolean>(false)

  const parsedW = parseInt(widthStr)
  const parsedH = parseInt(heightStr)

  const width = Number.isInteger(parsedW) ? parsedW : WIDTH
  const height = Number.isInteger(parsedH) ? parsedH : HEIGHT

  const [selected, setSelected] = useState<SelectedState>({})

  const [selectedColor, setSelectedColor] = useState<string>('')

  function handleClick(evt: React.MouseEvent<HTMLElement>, i: number, j: number) {
    console.log(`Clicking on ${i} ${j}`)
    setSelected((prevState) => ({
      ...prevState,
      [i]: { ...prevState[i], [j]: prevState[i] && prevState[i][j] ? '' : selectedColor },
    }))
  }

  const rows: ReactChild[] = []
  for (let i = 0; i < height; i++) {
    const cells: ReactChild[] = []
    for (let j = 0; j < width; j++) {
      const cellClass = styles.cell
      const cellColor = selected[i] && selected[i][j] !== "" ? { background: selected[i][j] } : {}
      cells[j] = (
        <td
          key={`${i}-${j}`}
          className={cellClass}
          style={cellColor}
          onClick={(e) => handleClick(e, i, j)}
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
      <div style={{ marginBottom: 40 }}>
        <label htmlFor="width">Width:</label>
        <input id="width" type="text" value={widthStr} onChange={(e) => setWidthStr(e.target.value)} />
        <label htmlFor="height">Height:</label>
        <input id="height" type="text" value={heightStr} onChange={(e) => setHeightStr(e.target.value)} />
        <button onClick={() => setShowState((prevState) => !prevState)}>Show JSON</button>
      </div>
      {showState && <textarea value={JSON.stringify(selected)}></textarea>}
      <div className={styles.grid} style={{ marginBottom: 40 }}>
        {Colors.map((c, idx) => (
          <div
            key={idx}
            className={`${styles.colorCell} ${selectedColor === c ? styles.selected : ''}`}
            style={{ background: c }}
            onClick={() => setSelectedColor(c)}
          ></div>
        ))}
      </div>
      { selectedColor !== "" ? <p>Selected color: {selectedColor}</p> : null }
      <table className={styles.flag}>
        <tbody>{rows}</tbody>
      </table>
    </main>
  )
}
