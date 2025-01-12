"use client"
import Nav from "@/components/Nav";
import styles from "./page.module.css";
import Main from "@/components/Main";
import ModalProvider from "@/context/ModalContext";
import Modal from "@/components/Modal";
import TimerProvider from "@/context/TimerContext";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";


export default function Home() {
    const { loading } = useAuth();

    if (loading) {
        return <Loading/>;
    }
    
    return (
        <ModalProvider>
            <TimerProvider>
                <Nav />
                <Main />
                <Modal />
            </TimerProvider>
        </ModalProvider>
    );
}
