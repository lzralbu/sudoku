import styles from "./Board.module.css";
import Box from "./Box";
import Cell from "./Cell";

export default function Board({
  currentSudoku,
  cellValues,
  selectedCellId,
  handleCellSelection,
}) {
  return (
    <div className={styles.board}>
      {Array.from({ length: 9 }, (_, boxIndex) => (
        <Box key={boxIndex}>
          {Array.from({ length: 9 }, (_, subBoxIndex) => {
            const cellIndex = 9 * boxIndex + subBoxIndex;
            return (
              <Cell
                key={cellIndex}
                currentSudoku={currentSudoku}
                id={cellIndex}
                value={
                  cellValues[cellIndex] === "-" ? null : cellValues[cellIndex]
                }
                selectedCellId={selectedCellId}
                handleCellSelection={handleCellSelection}
              ></Cell>
            );
          })}
        </Box>
      ))}
    </div>
  );
}
