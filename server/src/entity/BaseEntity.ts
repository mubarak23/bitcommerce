import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import TableColumns from "../enums/TableColumns";

export default abstract class DefualtEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({
    type: "timestamptz",
    name: TableColumns.CREATED_AT,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: TableColumns.UPDATED_AT })
  updatedAt!: Date;
}
