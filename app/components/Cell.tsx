import { useState } from "react";
import styles from "./Cell.module.css";

export default function Cell({
  id,
  value,
  selectedCellId,
  handleCellSelection,
}) {
  return (
    <div
      className={id !== selectedCellId ? styles.cell : styles.selectedCell}
      onClick={(e) => handleCellSelection(id)}
    >
      {value}
    </div>
  );
}
