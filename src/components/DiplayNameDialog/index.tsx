import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";

export default function DisplayNameDialog() {
  const [isTheModalOpen, setIsTheModalOpen] = useState(true);
  return (
    <Modal
      isTheModalOpen={isTheModalOpen}
      setIsTheModalOpen={setIsTheModalOpen}
    >
      <div>Defina um usuário para a sua conta.</div>
      <Input />
      <em>É necesário ter um nome para poder adicionar outros usuários.</em>
    </Modal>
  );
}
