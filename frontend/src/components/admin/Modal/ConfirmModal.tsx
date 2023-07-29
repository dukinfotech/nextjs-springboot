"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { atom, useAtom } from "jotai";
import { EngineWarning } from "react-flaticons";

interface ConfirmModalProps {
  action: string;
  onDelete: (id: number) => void;
}

export const confirmIdAtom = atom<number | null>(null);
export default function ConfirmModal({ action, onDelete }: ConfirmModalProps) {
  const [confirmId, setConfirmId] = useAtom(confirmIdAtom);

  const handleDelete = () => {
    onDelete(confirmId as number);
    setConfirmId(null);
  };

  return (
    <Modal isOpen={Boolean(confirmId)} placement="top-center" hideCloseButton>
      <ModalContent>
        <ModalHeader className="flex flex-row items-center gap-1">
          <EngineWarning /> Confirm
        </ModalHeader>
        <ModalBody>
          <p>{`Are you sure to ${action} the record #${confirmId}?`}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="light"
            color="danger"
            onPress={() => setConfirmId(null)}
          >
            Cancel
          </Button>
          <Button color="primary" onPress={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
