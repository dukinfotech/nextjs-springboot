"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ArrowSmallLeft } from "react-flaticons";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button color="primary" variant="flat" onPress={() => router.back()}>
      <ArrowSmallLeft />
      Back
    </Button>
  );
}
