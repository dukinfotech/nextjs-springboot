import { Button, Tooltip } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { Pencil } from "react-flaticons";

interface EditButtonProps {
  text: string;
  id: number;
}

export default function EditButton({ text, id }: EditButtonProps) {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Tooltip color="primary" content={text}>
      <Button
        isIconOnly
        size="sm"
        color="primary"
        aria-label={text}
        className="p-2"
        onPress={() => router.push(`${pathName}/${id}`)}
      >
        <Pencil />
      </Button>
    </Tooltip>
  );
}
