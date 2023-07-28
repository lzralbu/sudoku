"use client";

import styles from "./page.module.css";
import { useState } from "react";
import Board from "./components/Board";
import { getSudoku } from "sudoku-gen";
import { Sudoku } from "sudoku-gen/dist/types/sudoku.type";

export default function Game() {
  const [currentSudoku, setCurrentSudoku] = useState<Sudoku>();
  const [selectedCellId, setSelectedCellId] = useState(-1);
  const [validator, setValidator] = useState();

  function handleCellSelection(cellId) {
    if (currentSudoku.puzzle[cellId] === "-") {
      setSelectedCellId(cellId);
    }
  }

  return (
    <div className={styles.game}>
      <h1>Sudoku</h1>
      <Board
        currentSudoku={currentSudoku}
        selectedCellId={selectedCellId}
        handleCellSelection={handleCellSelection}
      ></Board>
      <div>
        {Array.from({ length: 9 }, (v, k) => (
          <button key={k}>{k + 1}</button>
        ))}
        <button onClick={() => setCurrentSudoku(getSudoku())}>New game</button>
        <label htmlFor="difficulty-select">Choose difficulty: </label>
        <select name="difficulty" id="difficulty-select">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
}

function generateInitialValidator() {}

// type CellType = 0 | 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9;

// type BoardTuple = [
//   Set<CellType>,
//   Set<CellType>,
//   Set<CellType>,
//   Set<CellType>,
//   Set<CellType>,
//   Set<CellType>,
//   Set<CellType>,
//   Set<CellType>,
//   Set<CellType>
// ];

// type BoardValidator = {
//   rows: BoardTuple;
//   columns: BoardTuple;
//   boxes: BoardTuple;
// };
