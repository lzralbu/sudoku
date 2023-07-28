"use client";

import styles from "./Board.module.css";
import { useState } from "react";
import Box from "./Box";
import Cell from "./Cell";

export default function Board({
  currentSudoku,
  selectedCellId,
  handleCellSelection,
}) {
  return (
    <div className={styles.board}>
      {Array.from({ length: 9 }, (_, boxIndex) => (
        <Box key={boxIndex}>
          {Array.from({ length: 9 }, (_, cellBoxIndex) => {
            const cellIndex = boxIndex * 9 + cellBoxIndex;
            return (
              <Cell
                key={cellIndex}
                id={cellIndex}
                value={
                  currentSudoku?.puzzle[cellIndex] === "-"
                    ? null
                    : currentSudoku?.puzzle[cellIndex]
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
