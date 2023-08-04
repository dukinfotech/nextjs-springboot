"use client";

import BackButton from "@/components/admin/Button/BackButton";
import PermissionEntity from "@/entities/PermissionEntity";
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

type EditPermissionForm = {
  name?: string;
  text?: string;
};

interface EditPermissionProps {
  permission: PermissionEntity;
}

export default function EditPermission({ permission }: EditPermissionProps) {
  const [editPermissionForm, setEditPermissionForm] =
    useState<EditPermissionForm>(permission);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsLoading(true);
    const res = await api.put(`/api/permissions/${permission.id}`, editPermissionForm);
    if (res.ok) {
      toast.success("Updated permission successully");
      router.back();
    } else {
      toast.error(res.statusText);
    }
    setIsLoading(false);
  };

  const isFormValid = useMemo(() => {
    return editPermissionForm?.name && editPermissionForm?.text;
  }, [editPermissionForm]);

  return (
    <Card className="max-w-full">
      <CardHeader className="flex justify-between">
        <div className="text-xl font-bold text-gray-800">Edit Permission</div>
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
          value={editPermissionForm.name}
          onValueChange={(val) =>
            setEditPermissionForm({ ...editPermissionForm, name: val })
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
          value={editPermissionForm.text}
          onValueChange={(val) =>
            setEditPermissionForm({ ...editPermissionForm, text: val })
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
