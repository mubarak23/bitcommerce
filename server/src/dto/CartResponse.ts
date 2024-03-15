import { CartItemJson } from "../interfaces/CartItemJson";

export interface CartResponse {
  uuid: string,
  userId: number,
  cartItems: CartItemJson[];
}