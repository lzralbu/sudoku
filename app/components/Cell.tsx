import styles from "./Cell.module.css";

export default function Cell({
  currentSudoku,
  id,
  value,
  selectedCellId,
  handleCellSelection,
}) {
  return (
    <div
      className={
        currentSudoku.puzzle[id] !== "-"
          ? styles.initialCell
          : id === selectedCellId
          ? styles.selectedCell
          : styles.cell
      }
      onClick={() => handleCellSelection(id)}
    >
      {value}
    </div>
  );
}
