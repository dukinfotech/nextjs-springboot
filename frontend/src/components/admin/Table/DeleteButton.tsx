import { Button, Tooltip } from "@nextui-org/react";
import { Trash } from "react-flaticons";
import { confirmIdAtom } from "../Modal/ConfirmModal";
import { useSetAtom } from "jotai";

interface DeleteButtonProps {
  text: string;
  id: number;
}

export default function DeleteButton({ text, id }: DeleteButtonProps) {
  const setConfirmId = useSetAtom(confirmIdAtom);

  return (
    <Tooltip color="danger" content={text}>
      <Button
        isIconOnly
        size="sm"
        color="danger"
        aria-label={text}
        className="p-2"
        onPress={() => setConfirmId(id)}
      >
        <Trash />
      </Button>
    </Tooltip>
  );
}
