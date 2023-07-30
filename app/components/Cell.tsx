import styles from "./Cell.module.css";
import { GameState } from "../lib/sudokuReducer";

type CellProps = {
  id: number;
  state: GameState;
  handleCellSelection: (id: number) => void;
  value: string;
};

export default function Cell({
  id,
  state,
  handleCellSelection,
  value,
}: CellProps) {
  return (
    <div
      className={
        state.puzzle[id] !== "-"
          ? styles.initialCell
          : id === state.selectedCellId
          ? styles.selectedCell
          : styles.cell
      }
      onClick={() => handleCellSelection(id)}
    >
      {value}
    </div>
  );
}
