import Nav from "@/components/Nav";
import styles from "./page.module.css";
import Main from "@/components/Main";
import ModalProvider from "@/context/ModalContext";
import Modal from "@/components/Modal";
import TimerProvider from "@/context/TimerContext";


export default function Home() {
  return (
    <div className={styles.page}>
      <ModalProvider>
        <TimerProvider>
          <Nav />
          <Main />
          <Modal />
        </TimerProvider>
      </ModalProvider>
    </div>
  );
}
