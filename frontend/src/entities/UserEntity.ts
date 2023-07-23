export default interface UserEntity {
  id: number
  firstName: string,
  lastName: string,
  email: string,
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}