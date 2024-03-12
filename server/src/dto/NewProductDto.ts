export interface NewProductDto {
  categoryUuid: string,
  brandUuid: string,
  name: string,
  description: string,
  minQty: number,
  maxQty: number,
  price: number,
}