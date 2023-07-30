"use client";

import BackButton from "@/components/admin/Button/BackButton";
import { api } from "@/utils/api";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Spacer,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

type CreateRoleForm = {
  name?: string;
  text?: string;
};

export default function CreateRolePage() {
  const [createRoleForm, setCreateRoleForm] = useState<CreateRoleForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsLoading(true);
    const res = await api.post("/api/roles", createRoleForm);
    if (res.ok) {
      toast.success("Created role successully");
      router.back();
    } else {
      toast.error(res.statusText);
    }
    setIsLoading(false);
  };

  const isFormValid = useMemo(() => {
    return createRoleForm?.name && createRoleForm?.text;
  }, [createRoleForm]);

  return (
    <Card className="max-w-full">
      <CardHeader className="flex justify-between">
        <div className="text-xl font-bold text-gray-800">Create Role</div>
        <BackButton />
      </CardHeader>
      <Divider />
      <CardBody className="max-w-[800px]">
        <Input
          isRequired
          isClearable
          type="text"
          label="Name"
          size="md"
          variant="bordered"
          color="primary"
          onValueChange={(val) =>
            setCreateRoleForm({ ...createRoleForm, name: val })
          }
        />
        <Spacer y={5} />
        <Input
          isRequired
          isClearable
          type="text"
          label="Text"
          size="md"
          variant="bordered"
          color="primary"
          onValueChange={(val) =>
            setCreateRoleForm({ ...createRoleForm, text: val })
          }
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          color="success"
          isLoading={isLoading}
          isDisabled={!isFormValid}
          onPress={handleSave}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
