import { GameState } from "../lib/sudokuReducer";
import styles from "./Menu.module.css";

type MenuProps = {
  state: GameState;
  handleNewGame: () => void;
  handleDifficultySelection: (difficulty: string) => void;
  handleShowSolution: () => void;
};

export default function Menu({
  state,
  handleNewGame,
  handleDifficultySelection,
  handleShowSolution,
}: MenuProps) {
  return (
    <div className={styles.menu}>
      <button onClick={handleNewGame}>New game</button>
      <label>
        Choose difficulty:{" "}
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
      <button onClick={handleShowSolution}>Show solution</button>
    </div>
  );
}
