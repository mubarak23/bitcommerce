import { SimpleImageJson } from "./SimpleImageJson";

export interface CartItemJson {
  productId: number,
  productUuid: string;
  productName: string,
  quantity: number,
  unitPrice: number,
  images?: SimpleImageJson[],
}