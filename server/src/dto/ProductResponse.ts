import { SimpleImageJson } from "../interfaces/SimpleImageJson";

export interface ProductResponse {
  productUuid: string,
  categoryUuid: string,
  brandUuid: string,
  name: string,
  description: string,
  minQty: number,
  maxQty: number,
  price: number,
  priceInSats: number,
  images?: SimpleImageJson[] | null
}