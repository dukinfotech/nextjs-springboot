import { Button, Tooltip } from "@nextui-org/react";
import { Trash } from "react-flaticons";

interface DeleteButtonProps {
  text: string;
}

export default function DeleteButton({ text }: DeleteButtonProps) {
  return (
    <Tooltip color="danger" content={text}>
      <Button
        isIconOnly
        size="sm"
        color="danger"
        aria-label={text}
        className="p-2"
      >
        <Trash />
      </Button>
    </Tooltip>
  );
}
