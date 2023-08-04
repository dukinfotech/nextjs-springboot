export default interface UserEntity {
  id: number
  firstName: string,
  lastName: string,
  email: string,
  createdAt: Date,
  updatedAt: Date,
  lastUpdatedBy: UserEntity,
  deletedAt: Date | null
}