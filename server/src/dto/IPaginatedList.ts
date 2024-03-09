
export interface IPaginatedList<T> {
    pageNumber: number, 
    total: number,
    pageSize: number,
    dataset: T[]
  }
  