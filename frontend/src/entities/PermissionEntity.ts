import UserEntity from "./UserEntity"

export default interface PermissionEntity {
  id: number
  name: string,
  text: string,
  createdAt: Date,
  updatedAt: Date,
  lastUpdatedBy: UserEntity,
  deletedAt: Date | null
}