import EditRole from "@/components/admin/modules/Role/EditRole";
import RoleEntity from "@/entities/RoleEntity";
import { api } from "@/utils/api";

const fetchRole = async (id: number): Promise<RoleEntity> => {
  const res = await api.get(`/api/roles/${id}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error(res.statusText);
  }
}

export default async function EditRolePage({ params }: { params: { id: number } }) {
  const role = await fetchRole(params.id);

  return <EditRole role={role} />
}
