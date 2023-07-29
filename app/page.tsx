"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";
import Board from "./components/Board";

import { getSudoku } from "sudoku-gen";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";

const initialCellValues =
  "389157462756842391241369875634971825918425673527683194716293548589164237432758916";

function cellIdToCellPosition(cellId) {
  const box = Math.floor(cellId / 9);
  const subBox = cellId % 9;
  const row = 3 * Math.floor(box / 3) + Math.floor(subBox / 3);
  const column = 3 * (box % 3) + (subBox % 3);

  return {
    row,
    column,
    box,
  };
}

function cellPositionToCellId({ row, column }) {
  const box = 3 * Math.floor(row / 3) + Math.floor(column / 3);
  const subBox = 3 * (row % 3) + (column % 3);

  return box * 9 + subBox;
}

function sudokuIndexToCellId(index) {
  const row = Math.floor(index / 9);
  const column = index % 9;
  return cellPositionToCellId({ row, column });
}

export default function Game() {
  const [currentSudoku, setCurrentSudoku] = useState({
    puzzle: initialCellValues,
    solution: initialCellValues,
  });

  const [selectedCellId, setSelectedCellId] = useState(-1);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("medium");

  const [cellValues, setCellValues] = useState(initialCellValues);

  useEffect(() => {
    function handleKeyDown(e) {
      e.stopPropagation();
      if (isFinite(e.key as unknown as number) && Number(e.key) > 0) {
        handleValueSelection(e.key);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function validateMove(cellId: number, cellPosition, newValue: string) {
    if (currentSudoku.puzzle[cellId] !== "-") {
      return false;
    }

    for (let i = 0; i < 9; ++i) {
      if (
        cellValues[
          cellPositionToCellId({
            row: i,
            column: cellPosition.column,
          })
        ] === newValue
      ) {
        return false;
      }

      if (
        cellValues[
          cellPositionToCellId({
            row: cellPosition.row,
            column: i,
          })
        ] === newValue
      ) {
        return false;
      }

      if (cellValues[9 * cellPosition.box + i] === newValue) {
        return false;
      }
    }

    return true;
  }

  function makeMove(cellId: number, newValue: string): boolean {
    const cellPosition = cellIdToCellPosition(cellId);
    if (!validateMove(cellId, cellPosition, newValue)) {
      return false;
    }

    setCellValues(
      (oldCellValues) =>
        oldCellValues.slice(0, cellId) +
        newValue +
        oldCellValues.slice(cellId + 1)
    );

    return true;
  }

  function handleNewGame() {
    const { puzzle, solution } = getSudoku(selectedDifficulty);
    const tempPuzzle = Array(81).fill("-");
    const tempSolution = Array(81).fill("-");
    for (let i = 0; i < puzzle.length; ++i) {
      const cellId = sudokuIndexToCellId(i);
      tempPuzzle[cellId] = puzzle[i];
      tempSolution[cellId] = solution[i];
    }
    // console.log(tempSolution.join(""));

    const convertedPuzzle = tempPuzzle.join("");
    setCurrentSudoku({
      puzzle: convertedPuzzle,
      solution: tempSolution.join(""),
    });
    setCellValues((_) => convertedPuzzle);

    for (let cellId = 0; cellId < convertedPuzzle.length; ++cellId) {
      makeMove(cellId, convertedPuzzle[cellId]);
    }
  }

  function handleCellSelection(cellId) {
    if (currentSudoku.puzzle[cellId] === "-") {
      setSelectedCellId(cellId);
    }
  }

  function handleValueSelection(value: string) {
    if (selectedCellId < 0) {
      return;
    }

    makeMove(selectedCellId, value);
  }

  return (
    <div className={styles.game}>
      <h1>Sudoku</h1>
      <Board
        currentSudoku={currentSudoku}
        cellValues={cellValues}
        selectedCellId={selectedCellId}
        handleCellSelection={handleCellSelection}
      ></Board>
      <div>
        <div>
          {Array.from({ length: 9 }, (v, k) => (
            <button key={k} onClick={() => handleValueSelection(`${k + 1}`)}>
              {k + 1}
            </button>
          ))}
        </div>
        <button onClick={handleNewGame}>New game</button>
        <label>
          Choose difficulty:
          <select
            value={selectedDifficulty}
            onChange={(e) =>
              setSelectedDifficulty(e.target.value as Difficulty)
            }
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        </label>
      </div>
    </div>
  );
}
