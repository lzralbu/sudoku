import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <p className={styles.my_css}>
      I am a paragraph of text that has a few words in it.
    </p>
  );
}
