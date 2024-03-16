import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { OrderStatuses, PaymentStatus } from "../enums/Statuses";
import TableColumns, { OrderColumns } from "../enums/TableColumns";
import Tables from "../enums/Tables";
import { CartItemJson } from "../interfaces/CartItemJson";
import { utcNow } from "../utils/core";
import { ColumnNumericTransformer } from "../utils/transformers";
import DefualtEntity from "./BaseEntity";
import { User } from "./User";


@Entity({ name: Tables.Orders })
export class Order extends DefualtEntity {
  @Column({ name: OrderColumns.UUID, unique: true })
  uuid: string;

  @Column({ name: OrderColumns.BUYER_USER_ID, nullable: false })
  buyerUserId: number;

  @ManyToOne(() => User, { primary: true })
  @JoinColumn({
    name: OrderColumns.BUYER_USER_ID,
    referencedColumnName: TableColumns.ID,
  })
  buyerUser: User;

  // @Column({ name: OrderColumns.SELLER_USER_ID, nullable: false })
  // sellerUserId: number;

  // @ManyToOne(() => User, { primary: true })
  // @JoinColumn({
  //   name: OrderColumns.SELLER_USER_ID,
  //   referencedColumnName: TableColumns.ID,
  // })
  // sellerUser: User;

  @Column({ type:'json', name: OrderColumns.ORDER_ITEMS, nullable: false})
  orderItems: CartItemJson[];

  @Column({ name: OrderColumns.REFERENCE, nullable: false })
  reference: string;

  @Column({ name: OrderColumns.REFERENCE_NUMBER, nullable: true })
  referenceNumber: string;

  @Column({
    type: "decimal",
    name: OrderColumns.CALCULATED_TOTAL_COST_MAJOR,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  calculatedTotalCostMajor: number;

  @Column({
    type: "decimal",
    name: OrderColumns.CALCULATED_TOTAL_COST_MAJOR_SATS,
    default: 0,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  calculatedTotalCostMajorSats: number;


  @Column({ name: OrderColumns.PAYMENT_REQUEST, nullable: true })
  paymentRequest: string;


  @Column({ name: OrderColumns.PAYMENT_STATUS, nullable: false })
  paymentStatus: PaymentStatus;


  @Column({ name: OrderColumns.STATUS, nullable: false })
  status: OrderStatuses;

  @Column({
    type: "boolean",
    name: OrderColumns.IS_SOFT_DELETED,
    nullable: false,
    default: false,
  })
  isSoftDeleted: boolean;

  initializeNewOrderFromCartByBuyer(buyerUserId: number, orderItems: CartItemJson[], reference: string,
   paymentStatus: PaymentStatus, status: OrderStatuses, calculatedTotalCostMajor: number ){
    const now = utcNow();
    this.uuid = uuidv4();
    this.buyerUserId = buyerUserId;
    this.orderItems = orderItems;
    this.reference = reference;
    this.paymentStatus = paymentStatus;
    this.status = status;
    this.createdAt = now;
    return this
  }
}