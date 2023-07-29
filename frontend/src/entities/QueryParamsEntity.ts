export default interface QueryParamsEntity {
  search: string;
  page: number; // current page
  size: number; // page size
  sort: string; // sort column
  isAsc: boolean;
}
