import { SimpleImageJson } from "./SimpleImageJson";

export interface CartItemJson {
  productId: number,
  productUuid: string;
  productName: string,
  quantity: number,
  unitPrice: number,
  unitPriceForBuyer: number,
  unitPromoPriceForBuyer?: number | null,
  promotionId?: number | null, 
  images?: SimpleImageJson[],
}