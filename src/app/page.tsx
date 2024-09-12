import Nav from "@/components/Nav";
import styles from "./page.module.css";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav/>
      <Main/>
    </div>
  );
}
