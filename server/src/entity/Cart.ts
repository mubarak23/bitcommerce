import { Column, Entity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CartColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { CartItemJson } from "../interfaces/CartItemJson";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";
import { Product } from "./Product";


@Entity({ name: Tables.Carts })
export class Cart extends DefualtEntity {
  @Column({ name: CartColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: CartColumns.USER_ID, nullable: false })
  userId: number;

  @Column({ name: CartColumns.CART_ITEMS, nullable: false })
  cartItems: CartItemJson[];


  @Column({
    type: "boolean",
    name: CartColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initializeFirstCart(userId: number, product: Product, quantity: number){
    const now = utcNow();
    this.uuid = uuidv4();
    this.userId = userId;

    this.cartItems = [{
      productId: product.id,
      productUuid: product.uuid,
      productName: product.name,
      quantity,
      unitPrice: product.price ?? 0,
      images: product.images,
    }]
    this.createdAt = now;
    return this
  }
}