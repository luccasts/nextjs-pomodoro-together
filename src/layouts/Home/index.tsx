"use client";
import Nav from "@/components/Nav";
import Main from "@/components/Main";
import ModalProvider from "@/context/ModalContext";

import TimerProvider from "@/context/TimerContext";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import ConfigurationDialog from "@/components/ConfigurationDialog";
import StudyReport from "@/components/StudyReport";
import DisplayNameDialog from "@/components/DiplayNameDialog";
import { useEffect, useState } from "react";

export default function Home() {
  const { loading, user } = useAuth();
  const [openDisplayNameDialog, setOpenDisplayNameDialog] = useState(false);
  useEffect(() => {
    if (user) {
      if (!user?.displayName) {
        return setOpenDisplayNameDialog(true);
      }
    }
  }, [user]);
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
        {openDisplayNameDialog ? <DisplayNameDialog /> : null}
      </TimerProvider>
    </ModalProvider>
  );
}
