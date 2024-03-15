import { IProfile } from "../interfaces/IProfile";

export interface ProductResponse {
  productUuid: string,
  categoryUuid: string,
  categoryName?: string  | null,
  brandUuid: string,
  brandName?: string | null,
  name: string,
  description: string,
  minQty: number,
  maxQty: number,
  price: number,
  priceInSats: number,
  images?:  {
    url: string,
    mimetype: string,
  }[] | null,
  seller: IProfile
}