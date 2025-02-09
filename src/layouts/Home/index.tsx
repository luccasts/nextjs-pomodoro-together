"use client";
import Nav from "@/components/Nav";
import Main from "@/components/Main";
import ModalProvider from "@/context/ModalContext";

import TimerProvider from "@/context/TimerContext";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import ConfigurationDialog from "@/components/ConfigurationDialog";
import StudyReport from "@/components/StudyReport";

export default function Home() {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <ModalProvider>
      <TimerProvider>
        <Nav />
        <Main />
        {/* <Modal /> */}
        <ConfigurationDialog />
        <StudyReport userId={user?.uid} />
      </TimerProvider>
    </ModalProvider>
  );
}
