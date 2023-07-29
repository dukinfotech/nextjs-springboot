import { Button, Tooltip } from "@nextui-org/react";
import { Pencil } from "react-flaticons";

interface EditButtonProps {
  text: string;
}

export default function EditButton({ text }: EditButtonProps) {
  return (
    <Tooltip color="primary" content={text}>
      <Button
        isIconOnly
        size="sm"
        color="primary"
        aria-label={text}
        className="p-2"
      >
        <Pencil />
      </Button>
    </Tooltip>
  );
}
