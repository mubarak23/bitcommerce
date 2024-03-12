import { SimpleImageJson } from "../interfaces/SimpleImageJson";

export interface BrandResponse {
  uuid: string,
  name: string,
  description: string,
  image?: SimpleImageJson | null,
}