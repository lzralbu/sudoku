import { getSudoku } from "sudoku-gen";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";

export type GameState = {
  puzzle: string;
  solution: string;
  cellValues: string;
  selectedCellId: number;
  selectedDifficulty: string;
};

type ActionType =
  | { type: "startedNewGame" }
  | { type: "selectedCell"; cellId: number }
  | { type: "selectedValue"; value: string }
  | { type: "selectedDifficulty"; difficulty: string }
  | { type: "clearedSelectedCell" }
  | { type: "gaveUp" };

export default function sudokuReducer(
  state: GameState,
  action: ActionType
): GameState {
  switch (action.type) {
    case "startedNewGame": {
      const { puzzle, solution } = getSudoku(
        state.selectedDifficulty as Difficulty
      );
      const tempPuzzle = Array(81);
      const tempSolution = Array(81);
      for (let i = 0; i < puzzle.length; ++i) {
        const cellId = sudokuIndexToCellId(i);
        tempPuzzle[cellId] = puzzle[i];
        tempSolution[cellId] = solution[i];
      }
      const convertedPuzzle = tempPuzzle.join("");

      const newState = {
        puzzle: convertedPuzzle,
        solution: tempSolution.join(""),
        cellValues: convertedPuzzle,
        selectedCellId: -1,
        selectedDifficulty: state.selectedDifficulty,
      };

      for (let cellId = 0; cellId < convertedPuzzle.length; ++cellId) {
        if (!validateMove(newState, cellId, convertedPuzzle[cellId])) {
          continue;
        }

        newState.cellValues =
          newState.cellValues.slice(0, cellId) +
          convertedPuzzle[cellId] +
          newState.cellValues.slice(cellId + 1);
      }

      return newState;
    }

    case "selectedCell": {
      if (state.puzzle[action.cellId] !== "-") {
        return state;
      }

      return {
        ...state,
        selectedCellId: action.cellId,
      };
    }

    case "selectedValue": {
      if (
        state.selectedCellId < 0 ||
        !validateMove(state, state.selectedCellId, action.value)
      ) {
        return state;
      }

      return {
        ...state,
        cellValues:
          state.cellValues.slice(0, state.selectedCellId) +
          action.value +
          state.cellValues.slice(state.selectedCellId + 1),
      };
    }

    case "selectedDifficulty": {
      return {
        ...state,
        selectedDifficulty: action.difficulty,
      };
    }

    case "clearedSelectedCell": {
      if (state.selectedCellId < 0) {
        return state;
      }

      return {
        ...state,
        cellValues:
          state.cellValues.slice(0, state.selectedCellId) +
          "-" +
          state.cellValues.slice(state.selectedCellId + 1),
      };
    }

    case "gaveUp": {
      return {
        ...state,
        cellValues: state.solution,
      };
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

function validateMove(state: GameState, cellId: number, newValue: string) {
  if (state.puzzle[cellId] !== "-") {
    return false;
  }

  const cellPosition = cellIdToCellPosition(cellId);
  for (let i = 0; i < 9; ++i) {
    if (
      state.cellValues[
        cellPositionToCellId({
          row: i,
          column: cellPosition.column,
        })
      ] === newValue
    ) {
      return false;
    }

    if (
      state.cellValues[
        cellPositionToCellId({
          row: cellPosition.row,
          column: i,
        })
      ] === newValue
    ) {
      return false;
    }

    if (state.cellValues[9 * cellPosition.box + i] === newValue) {
      return false;
    }
  }

  return true;
}

function cellIdToCellPosition(cellId: number) {
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

function cellPositionToCellId({
  row,
  column,
}: {
  row: number;
  column: number;
}) {
  const box = 3 * Math.floor(row / 3) + Math.floor(column / 3);
  const subBox = 3 * (row % 3) + (column % 3);
  return box * 9 + subBox;
}

function sudokuIndexToCellId(index: number) {
  const row = Math.floor(index / 9);
  const column = index % 9;
  return cellPositionToCellId({ row, column });
}
