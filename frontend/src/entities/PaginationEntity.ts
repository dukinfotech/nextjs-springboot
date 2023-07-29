export default interface PaginationEntity<T> {
  number: number // current page (number = 0 means page = 1)
  totalPages: number,
  size: number, // page size
  numberOfElements: number // total all in current page
  totalElements: number, // total all in database
  content: Array<T> // data
}