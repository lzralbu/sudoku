"use client";

import { useEffect, useReducer } from "react";

import styles from "./page.module.css";
import Board from "./components/Board";
import sudokuReducer, { GameState } from "./lib/sudokuReducer";

const initialCellValues =
  "389157462756842391241369875634971825918425673527683194716293548589164237432758916";

const initialState: GameState = {
  puzzle: "",
  solution: "",
  cellValues: "",
  selectedCellId: -1,
  selectedDifficulty: "medium",
};

export default function Sudoku() {
  const [state, dispatch] = useReducer(sudokuReducer, initialState, (state) => {
    return initialState;
  });

  useEffect(() => {
    function handleKeyDown(e) {
      e.stopPropagation();
      if (isFinite(e.key as unknown as number) && Number(e.key) > 0) {
        handleValueSelection(e.key);
      } else if (e.key === "Backspace" && state.selectedCellId >= 0) {
        handleClearSelectedCell();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleNewGame() {
    dispatch({
      type: "startedNewGame",
    });
  }

  function handleCellSelection(cellId) {
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

  function handleDifficultySelection(difficulty) {
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

  return (
    <div className={styles.game}>
      <h1>Sudoku</h1>
      <Board state={state} handleCellSelection={handleCellSelection}></Board>
      <div>
        <div>
          {Array.from({ length: 9 }, (v, k) => (
            <button key={k} onClick={() => handleValueSelection(`${k + 1}`)}>
              {k + 1}
            </button>
          ))}
          <button onClick={handleClearSelectedCell}>Clear selection</button>
          <button onClick={() => {}}>Solution</button>
        </div>
        <button onClick={handleNewGame}>New game</button>
        <label>
          Choose difficulty:
          <select
            value={state.selectedDifficulty}
            onChange={(e) => handleDifficultySelection(e.target.value)}
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
