import { SimpleImageJson } from "../interfaces/SimpleImageJson";

export interface CategoryResponse {
  uuid: string,
  name: string,
  description: string,
  image?: SimpleImageJson | null,
}