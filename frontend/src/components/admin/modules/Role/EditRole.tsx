"use client";

import BackButton from "@/components/admin/Button/BackButton";
import RoleEntity from "@/entities/RoleEntity";
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

type EditRoleForm = {
  name?: string;
  text?: string;
};

interface EditRoleProps {
  role: RoleEntity;
}

export default function EditRole({ role }: EditRoleProps) {
  const [editRoleForm, setEditRoleForm] = useState<EditRoleForm>(role);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsLoading(true);
    const res = await api.put(`/api/roles/${role.id}`, editRoleForm);
    if (res.ok) {
      toast.success("Updated role successully");
      router.back();
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const isFormValid = useMemo(() => {
    return editRoleForm?.name && editRoleForm?.text;
  }, [editRoleForm]);

  return (
    <Card className="max-w-full">
      <CardHeader className="flex justify-between">
        <div className="text-xl font-bold text-gray-800">Edit Role</div>
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
          value={editRoleForm.name}
          onValueChange={(val) =>
            setEditRoleForm({ ...editRoleForm, name: val })
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
          value={editRoleForm.text}
          onValueChange={(val) =>
            setEditRoleForm({ ...editRoleForm, text: val })
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
