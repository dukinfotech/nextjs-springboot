import EditPermission from "@/components/admin/modules/Permission/EditPermission";
import PermissionEntity from "@/entities/PermissionEntity";
import { api } from "@/utils/api";

const fetchPermission = async (id: number): Promise<PermissionEntity> => {
  const res = await api.get(`/api/permissions/${id}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error(res.statusText);
  }
};

export default async function EditPermissionPage({
  params,
}: {
  params: { id: number };
}) {
  const permission = await fetchPermission(params.id);

  return <EditPermission permission={permission} />;
}
