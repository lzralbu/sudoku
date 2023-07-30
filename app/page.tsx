"use client";

import styles from "./page.module.css";

import { useEffect, useReducer } from "react";
import sudokuReducer, { GameState } from "./lib/sudokuReducer";
import Grid from "./components/Grid";
import Menu from "./components/Menu";

const initialCellValues =
  "389157462756842391241369875634971825918425673527683194716293548589164237432758916";

const initialState: GameState = {
  puzzle: initialCellValues,
  solution: initialCellValues,
  cellValues: initialCellValues,
  selectedCellId: -1,
  selectedDifficulty: "medium",
};

export default function Game() {
  const [state, dispatch] = useReducer(sudokuReducer, initialState);

  function handleNewGame() {
    dispatch({
      type: "startedNewGame",
    });
  }

  function handleCellSelection(cellId: number) {
    dispatch({
      type: "selectedCell",
      cellId,
    });
  }

  function handleValueSelection(value: string) {
    dispatch({
      type: "selectedValue",
      value,
    });
  }

  function handleDifficultySelection(difficulty: string) {
    dispatch({
      type: "selectedDifficulty",
      difficulty,
    });
  }

  function handleClearSelectedCell() {
    dispatch({
      type: "clearedSelectedCell",
    });
  }

  function handleShowSolution() {
    dispatch({
      type: "gaveUp",
    });
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      e.stopPropagation();
      if (isFinite(e.key as unknown as number) && Number(e.key) > 0) {
        handleValueSelection(e.key);
      } else if (e.key === "Backspace") {
        handleClearSelectedCell();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className={styles.game}>
      <h1>Sudoku</h1>
      <Grid state={state} handleCellSelection={handleCellSelection}></Grid>
      <Menu
        state={state}
        handleNewGame={handleNewGame}
        handleDifficultySelection={handleDifficultySelection}
        handleShowSolution={handleShowSolution}
      ></Menu>
    </div>
  );
}
