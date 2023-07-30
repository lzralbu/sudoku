import { GameState } from "../lib/sudokuReducer";
import styles from "./Board.module.css";
import Box from "./Box";
import Cell from "./Cell";

type BoardProps = {
  state: GameState;
  handleCellSelection: (id: number) => void;
};

export default function Board({ state, handleCellSelection }: BoardProps) {
  return (
    <div className={styles.board}>
      {Array.from({ length: 9 }, (_, boxIndex) => (
        <Box key={boxIndex}>
          {Array.from({ length: 9 }, (_, subBoxIndex) => {
            const cellIndex = 9 * boxIndex + subBoxIndex;
            return (
              <Cell
                key={cellIndex}
                id={cellIndex}
                state={state}
                handleCellSelection={handleCellSelection}
                value={
                  state.cellValues[cellIndex] === "-"
                    ? null
                    : state.cellValues[cellIndex]
                }
              ></Cell>
            );
          })}
        </Box>
      ))}
    </div>
  );
}
