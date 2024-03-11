import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import TableColumns, { ProductColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { SimpleImageJson } from "../interfaces/SimpleImageJson";
import { utcNow } from "../utils/core";
import DefualtEntity from "./BaseEntity";
import { User } from "./User";


@Entity({ name: Tables.Products })
export class Product extends DefualtEntity {
  @Column({ name: ProductColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: ProductColumns.USER_ID, nullable: false })
  userId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: ProductColumns.USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  buyerUser: User;

  @Column({ name: ProductColumns.CATEGORY_ID, nullable: false })
  categoryId: number;

  @Column({ name: ProductColumns.BRAND_ID, nullable: false })
  brandId: number;

  @Column({ name: ProductColumns.NAME, nullable: false })
  name: string;

  @Column({ name: ProductColumns.DESCRIPTION, nullable: false })
  description: string;

  @Column({ name: ProductColumns.PRICE, nullable: false })
  price: number;

  @Column({ name: ProductColumns.PRICR_IN_SATS, nullable: false })
  priceInSats: number;


  @Column({ name: ProductColumns.MAX_QTY, nullable: false })
  maxQty: number;

  @Column({ name: ProductColumns.MIN_QTY, nullable: false })
  minQty: number;

  @Column({ type: "jsonb", name: ProductColumns.IMAGES, nullable: true })
  images: SimpleImageJson[];

  @Column({
    type: "boolean",
    name: ProductColumns.IS_ACTIVE,
    nullable: false,
    default: false,
  })
  isActive: boolean;

  @Column({
    type: "boolean",
    name: ProductColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initializeNewProductBySeller(name: string, description: string, price: number, priceInSats: number, maxQty: number, minQty: number){
    const now = utcNow();
    this.uuid = uuidv4();
    this.name = name;
    this.description = description;
    this.price = price;
    this.priceInSats = priceInSats;
    this.maxQty = maxQty;
    this.minQty = minQty;
    this.createdAt = now;
    return this
  }
}