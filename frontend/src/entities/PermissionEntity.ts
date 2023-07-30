export default interface PermissionEntity {
  id: number
  name: string,
  text: string,
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}