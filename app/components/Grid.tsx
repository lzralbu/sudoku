import { GameState } from "../lib/sudokuReducer";
import styles from "./Grid.module.css";
import Box from "./Box";
import Cell from "./Cell";

type GridProps = {
  state: GameState;
  handleCellSelection: (id: number) => void;
};

export default function Grid({ state, handleCellSelection }: GridProps) {
  return (
    <div className={styles.grid}>
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
                value={state.cellValues[cellIndex]}
              ></Cell>
            );
          })}
        </Box>
      ))}
    </div>
  );
}
