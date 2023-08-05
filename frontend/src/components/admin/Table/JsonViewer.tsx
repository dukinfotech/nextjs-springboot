import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Snippet,
} from "@nextui-org/react";
import { Eye } from "react-flaticons";

interface JsonViewerProps {
  text: string;
  json: Object;
}

export default function JsonViewer({ text, json }: JsonViewerProps) {
  return (
    <Popover placement="left-start" color="default">
      <PopoverTrigger>
        <Button
          isIconOnly
          size="sm"
          color="primary"
          aria-label={text}
          className="p-2"
        >
          <Eye />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Snippet>
          <pre>{
            json.toString()
              .replaceAll("{", "{\n")
              .replaceAll("}", "\n}")
              .replaceAll(":", ": ")
              .replaceAll(",", ",\n")
              .replaceAll("\n\"", "\n\t\"")
          }</pre>
        </Snippet>
      </PopoverContent>
    </Popover>
  );
}
